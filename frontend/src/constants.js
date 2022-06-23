export const BACKEND_BASE_API = "http://localhost:8080/api/";

export const ADVERTISEMENT_TYPE_OPTIONS = [
  { label: "SVE", value: "ALL" },
  { label: "PONUDA", value: "DEMAND" },
  { label: "POTRAŽNJA", value: "OFFER" },
];

//LOCAL STORAGE
export const TOKEN_KEY = "token";

//RULES FOR FORM ITEMS

export const PASSWORD_RULES = [
  //IF MULTIPLE RULES NEEDED EXAPLE
  // {
  //   required: true,
  //   message: "Lozinka ne smije biti prazna",
  // },
  {
    required: true,
    message: "Lozinka nije validna. (minimalno 8 karaktera)",
    min: 8,
  },
];

export const CONFIRM_PASSWORD_RULES = [
  {
    required: true,
    message: "Molimo potvrdite vašu lozinku",
  },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Lozinke se ne poklapaju."));
    },
  }),
];

export const EMAIL_RULES = [
  {
    required: true,
    message: "Email adresa nije validna",
    type: "email",
  },
];

export const USERNAME_RULES = [
  {
    required: true,
    message: "Korisničko ime nije validno. (minimalno 6 karaktera)",
    min: 6,
  },
];
