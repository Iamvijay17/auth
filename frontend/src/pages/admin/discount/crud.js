import { DatePicker, Form, Input, InputNumber } from "antd";
import FormBuilder from "antd-form-builder";
import React, { useEffect } from "react";
import { generateCouponCode } from "../../../utils";

const { TextArea } = Input;

const DiscountCrud = ({ form, initialValues, onFinish }) => {


    
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);
    
  useEffect(() => {
    const couponCode = generateCouponCode();
    if(!initialValues) {
      form.setFieldsValue({"code": couponCode});
    }
  }, []);

  const PercentageInput = ({ value, onChange }) => {
   
    return (
      <InputNumber
        value={value}
        defaultValue={2}
        onChange={onChange}
        style={{ width: "100%" }}
      />
    );
  };


  const DatePick = ({ value, onChange }) => {
    return (
      <DatePicker
        value={value}
        onChange={onChange}
        format="DD-MM-YYYY"
        style={{ width: "100%" }}
      />
    );
  };
  

  const meta = {
    columns: 12,
    initialValues: initialValues,
    formItemLayout: null,
    colon: true,
    fields: [
      {
        key: "code",
        label: "Code",
        widget: Input,
        placeholder: "Enter code",
        colSpan: 4,
        rules: [{ required: true, message: "Please enter a code" }]
      },
     
      {
        key: "discountPercentage",
        label: "Discount Percentage",
        widget: PercentageInput,
        colSpan: 4,
        placeholder: "Enter discount percentage",
        rules: [
          { required: true, message: "Please enter discount percentage" },
          { type: "number", min: 1, max: 100, message: "Please enter a valid percentage between 0 and 100" }
        ]
      },
      {
        key: "validFrom",
        label: "Valid From",
        widget: DatePick,
        colSpan: 4,
        placeholder: "Select valid from date",
        rules: [{ required: true, message: "Please select a valid from date" }]
      },
      {
        key: "validTo",
        label: "Valid To",
        widget: DatePick,
        colSpan: 4,
        placeholder: "Select valid to date",
        rules: [{ required: true, message: "Please select a valid to date" }]
      },
      {
        key: "description",
        label: "Description",
        widget: TextArea,
        colSpan: 8,
        placeholder: "Enter your description",
        rules: [{ required: true, message: "Please enter a description" }]
      }
    ]
  };

  const handleSubmit = (values) => {
    console.log("Form values: ", values);
    onFinish(values);
  };

  return (
    <div style={{ padding: "20px", marginTop: "20px" }}>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <FormBuilder meta={meta} />
      </Form>
    </div>
  );
};

export default DiscountCrud;
