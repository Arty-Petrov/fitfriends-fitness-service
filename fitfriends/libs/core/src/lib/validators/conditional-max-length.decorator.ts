import {
  BadRequestException,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

interface Params {
  value: string;
  maxLength: number;
}

export function ConditionalMaxLength(
  property: string,
  conditions: Params[],
  validationOptions?: ValidationOptions
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'conditionalMaxLength',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
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
              `Property '${relatedPropertyName}': '${relatedValue}' allows max array length ${condition.maxLength} for property '${args.property}' but get ${value.length}`,
              HttpStatus.BAD_REQUEST
            );
          }
          return result;
        },
      },
    });
  };
}
