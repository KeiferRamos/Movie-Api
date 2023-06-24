import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function ValidateRole(
  property: any,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: Validaterole,
    });
  };
}

@ValidatorConstraint({ name: 'ValidateRole' })
export class Validaterole implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const [relatedPropertyName] = validationArguments.constraints;
    const role = validationArguments.object['role'];
    if (role !== 'administrator') {
      return true;
    }

    if (role === 'administrator' && value === relatedPropertyName) {
      return true;
    }
    return false;
  }
  defaultMessage() {
    return 'incorrect administrator level pass';
  }
}

export function ValidateObject(
  property: any,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: ValidateNestedObject,
    });
  };
}

@ValidatorConstraint({ name: 'ValidateObject' })
export class ValidateNestedObject implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const [relatedPropertyName] = validationArguments.constraints;
    const newVal = Object.assign(relatedPropertyName, value);
    const isEmpty = Object.keys(newVal).filter((key) => !newVal[key]);

    return !isEmpty.length;
  }
  defaultMessage() {
    return 'All fields are required';
  }
}

export function RegistrationId(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: ValidateRegistrationId,
    });
  };
}

@ValidatorConstraint({ name: 'RegistrationId' })
export class ValidateRegistrationId implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const [relatedPropertyName] = validationArguments.constraints;
    return value === relatedPropertyName;
  }
  defaultMessage() {
    return 'incorrect registration id';
  }
}

export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  }
  defaultMessage(args: ValidationArguments) {
    if (args.property === 'registrationId') {
      return 'incorrect registration id';
    }
    return 'password does not match';
  }
}
