export const generateToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 9; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  };
  