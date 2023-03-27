import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { deepParseJson } from 'deep-parse-json';
import { merge, pick } from 'lodash';
type ParseFormDataJsonOptions = {
  except?: string[];
};

export class ParseFormDataJsonPipe implements PipeTransform {
  constructor(private options?: ParseFormDataJsonOptions) { }

  transform(value: any, _metadata: ArgumentMetadata) {
    const { except } = this.options;
    const serializedValue = value;
    const originProperties = {};
    if (except?.length) {
      merge(originProperties, pick({ ...serializedValue }, ...except));
    }
    const deserializedValue = deepParseJson(value);
    return { ...deserializedValue.myJsonString, ...originProperties };
  }
}
