export default function getUniqueId() {
  return Math.floor(100000 + Math.random() * 900000);
}

export const regex = {
  email: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{1,5})$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  phoneNumber: /^\d{10}$/,
};
