export interface RegistrationStepOneModel {
  fullName: string;
  nationalId: string;
  gender: string;
  birthDate: string;
  phone: string;
  agreement: boolean;
}

export interface RegistrationStepTwoModel {
  password: string;
  confirmPassword: string;
  confirmationCodeDigit_0: string;
  confirmationCodeDigit_1: string;
  confirmationCodeDigit_2: string;
  confirmationCodeDigit_3: string;
  confirmationCodeDigit_4: string;
  confirmationCodeDigit_5: string;
}

export interface RegistrationStepThreeModel {
  nationalId: string;
  password: string;
  notifyBySms: boolean;
  standardReviewPeriod: boolean;
}

export interface RegistrationModel {
  step1: RegistrationStepOneModel;
  step2: RegistrationStepTwoModel;
  step3: RegistrationStepThreeModel;
}
