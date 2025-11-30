import { Parser } from 'json2csv';

export const generateCSV = (data, fields) => {
  try {
    const parser = new Parser({ fields });
    const csv = parser.parse(data);
    return csv;
  } catch (error) {
    throw new Error('Error generating CSV');
  }
};