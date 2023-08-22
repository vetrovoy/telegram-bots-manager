export const rules = {
  required: (message: string = "Обязательное поле") => ({
    required: true,
    message: message,
  }),
  isValidToken: (message: string) => () => ({
    validator(_: any, value: string) {
      const regex = /^\d{10}.{33,}$/;

      if (value && regex.test(value)) {
        return Promise.resolve();
      } else {
        return Promise.reject(new Error(message));
      }
    },
  }),
};
