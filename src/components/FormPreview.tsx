import React from 'react';
import { useForm } from 'react-hook-form';

interface Field {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

interface Schema {
  formTitle: string;
  formDescription: string;
  fields: Field[];
}

interface FormPreviewProps {
  schema: Schema;
}

const FormPreview: React.FC<FormPreviewProps> = ({ schema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    alert('Form submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg font-bold">{schema.formTitle}</h2>
      <p>{schema.formDescription}</p>
      {schema.fields.map((field) => {
        switch (field.type) {
          case 'text':
          case 'email':
          case 'textarea':
            return (
              <div key={field.id} className="mb-4">
                <label className="block text-sm font-medium">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  {...register(field.id, { required: field.required })}
                  className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${errors[field.id] ? 'border-red-500' : ''}`}
                />
                {errors[field.id] && <p className="text-red-500 text-sm">{field.label} is required</p>}
              </div>
            );
          case 'select':
            return (
              <div key={field.id} className="mb-4">
                <label className="block text-sm font-medium">{field.label}</label>
                <select {...register(field.id, { required: field.required })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                  {field.options?.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors[field.id] && <p className="text-red-500 text-sm">{field.label} is required</p>}
              </div>
            );
          case 'radio':
            return (
              <div key={field.id} className="mb-4">
                <label className="block text-sm font-medium">{field.label}</label>
                {field.options?.map(option => (
                  <div key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      value={option.value}
                      {...register(field.id, { required: field.required })}
                      className="mr-2"
                    />
                    <span>{option.label}</span>
                  </div>
                ))}
                {errors[field.id] && <p className="text-red-500 text-sm">{field.label} is required</p>}
              </div>
            );
          default:
            return null;
        }
      })}
      <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
    </form>
  );
};

export default FormPreview;