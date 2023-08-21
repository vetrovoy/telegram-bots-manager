export const rules = {
  required: (message: string = "Обязательное поле") => ({
    required: true,
    message: message,
  }),
  isValidToken: (message: string) => () => ({
    validator(_: any, value: string) {
      const regex = /^[\d]+:[A-Z\-a-z\d]+-[A-Z\-a-z\d]+$/;
      
      if (value && regex.test(value)) {
        return Promise.resolve();
      } else {
        return Promise.reject(new Error(message));
      }
    },
  }),
};
