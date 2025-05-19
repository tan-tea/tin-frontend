import {
    Provider,
    InjectionToken,
    RegistrationOptions,
} from 'tsyringe';

export type InjectableType = 'constructor'
| 'ValueProvider'
| 'FactoryProvider'
| 'TokenProvider'
| 'ClassProvider';

export type Injectable = {
  token: InjectionToken;
  provider: Provider;
  type: InjectableType;
  options?: RegistrationOptions;
};
