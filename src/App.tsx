import React, { useState } from 'react';
import JSONEditor from './components/JSONEditor';
import FormPreview from './components/FormPreview';

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

const initialSchema: Schema = {
  formTitle: "Project Requirements Survey",
  formDescription: "Please fill out this survey about your project needs",
  fields: [
    { id: "name", type: "text", label: "Full Name", required: true, placeholder: "Enter your full name" },
    { id: "email", type: "email", label: "Email Address", required: true, placeholder: "you@example.com" },
    { id: "companySize", type: "select", label: "Company Size", required: true, options: [{ value: "1-50", label: "1-50 employees" }, { value: "51-200", label: "51-200 employees" }] },
    { id: "industry", type: "radio", label: "Industry", required: true, options: [{ value: "tech", label: "Technology" }, { value: "healthcare", label: "Healthcare" }] },
    { id: "comments", type: "textarea", label: "Additional Comments", required: false, placeholder: "Any other details you'd like to share..." }
  ]
};

const App: React.FC = () => {
  const [schema, setSchema] = useState<Schema>(initialSchema);

  return (
    <div className="flex">
      <div className="w-1/2">
        <JSONEditor schema={schema} onSchemaChange={(newSchema: Schema) => setSchema(newSchema)} />
      </div>
      <div className="w-1/2">
        <FormPreview schema={schema} />
      </div>
    </div>
  );
};

export default App;
