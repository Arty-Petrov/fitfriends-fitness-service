import { HttpException, HttpStatus } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

interface Params {
  value: string;
  maxLength: number;
}

export function ConditionalMaxLength(
  property: string,
  conditions: Params[],
  validationOptions?: ValidationOptions
) {
  return function(object: object, propertyName: string) {
    registerDecorator({
      name: 'conditionalMaxLength',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: unknown[], args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue =
            (args.object as unknown)[relatedPropertyName];
          const condition = conditions.find(
            (condition) => condition.value === relatedValue
          );
          if (condition?.maxLength === undefined) {
            throw new HttpException(
              'There is no suitable condition value',
              HttpStatus.BAD_REQUEST
            );
          }
          const result = value.length <= condition.maxLength;
          if (!result) {
            throw new HttpException(
              `Property '{${relatedPropertyName}': '${relatedValue}}' expects that max array length of property '${args.property}' is ${condition.maxLength} but got ${value.length}`,
              HttpStatus.BAD_REQUEST
            );
          }
          return result;
        },
      },
    });
  };
}
