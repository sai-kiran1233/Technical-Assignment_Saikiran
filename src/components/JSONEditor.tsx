import React, { useState, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';


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

interface JSONEditorProps {
  schema: Schema; // Use the Schema interface here
  onSchemaChange: (schema: Schema) => void; // Use the Schema interface here
}

const JSONEditor: React.FC<JSONEditorProps> = ({ schema, onSchemaChange }) => {
  const [editorValue, setEditorValue] = useState<string>(JSON.stringify(schema, null, 2));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setEditorValue(JSON.stringify(schema, null, 2));
  }, [schema]);

  const handleEditorChange = (value: string) => {
    setEditorValue(value);
    try {
      const parsed: Schema = JSON.parse(value); // Ensure parsed value is typed as Schema
      onSchemaChange(parsed);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <MonacoEditor
        height="calc(100vh - 60px)"
        language="json"
        theme="vs-dark"
        value={editorValue}
        onChange={handleEditorChange}
      />
      {error && <p className="text-red-500 mt-2">Error: {error}</p>}
    </div>
  );
};

export default JSONEditor;