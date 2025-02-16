/* eslint-disable no-param-reassign */

export const genValidate = (validate: any, fieldName: string) => {
  const _validate: any = {};
  validate.forEach((e: any, i: any) => {
    _validate[`${fieldName}_${i}`] = e;
  });
  return _validate;
};

export const required = (value: any) => (value ? undefined : 'Không được để trống');

