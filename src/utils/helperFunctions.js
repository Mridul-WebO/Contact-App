import exportFromJSON from "export-from-json";
import Papa from "papaparse";

export function getUniqueId() {
  return Math.floor(100000 + Math.random() * 900000);
}

export const regex = {
  email: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{1,5})$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  phoneNumber: /^\d{10}$/,
};

export const handleContactsImport = (file, callBackFunc) => {
  Papa.parse(file, {
    header: true,
    error: (err) => console.log(err),
    complete: callBackFunc,
  });
};

export const handleContactsExport = (data, fileName) => {
  const exportType = exportFromJSON.types.csv;
  exportFromJSON({ data, fileName, exportType });
  return true;
};
