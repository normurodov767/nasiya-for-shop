import React, { useState } from "react";
import { Modal, Input, Button, message } from "antd";
import  useDebtor  from "../hooks/useDebtor";


const isValidPhoneNumber = (phone: string) => {
  const phonePattern = /^\+998\d{9}$/;
  return phonePattern.test(phone);
};

const AddDebtorModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { addDebtor, loading, error } = useDebtor();
  const [formData, setFormData] = useState({
    full_name: "",
    address: "",
    description: "",
    store: "",
    phone_numbers: ["", ""], 
    images: [] as string[], 
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneNumberChange = (index: number, value: string) => {
    const newPhoneNumbers = [...formData.phone_numbers];
    newPhoneNumbers[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      phone_numbers: newPhoneNumbers,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files) {
      const file = e.target.files[0]; 
      const fileURL = URL.createObjectURL(file); 
      const newImages = [...formData.images];
      newImages[index] = fileURL; 
      setFormData((prevData) => ({
        ...prevData,
        images: newImages,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   
    const validPhoneNumbers = formData.phone_numbers.filter(
      (num) => num.trim() !== "" && isValidPhoneNumber(num)
    );

    if (validPhoneNumbers.length < 2) {
      console.log("Please enter at least 2 phone numbers.");
      return;
    }

    
    if (formData.images.length !== 2) { 
      console.log("Please note that the image area should be at least 2 and no more.");
      return;
    }

   
    const result = await addDebtor({
      full_name: formData.full_name,
      address: formData.address,
      description: formData.description,
      store: formData.store,
      phone_numbers: validPhoneNumbers,
      images: formData.images, 
    });

    if (result) {
      message.success("The debtor has been added successfully!");
      onClose(); 
    } else {
      message.error("An error occurred.");
    }
  };

  return (
    <Modal
      title="Add debtor"
      visible={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ismi :</label>
          <Input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Yashash manzili:</label>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Eslatma:</label>
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label>Phone Number:</label>
          <Input
            type="text"
            value={formData.phone_numbers[0]}
            onChange={(e) => handlePhoneNumberChange(0, e.target.value)}
            required
          />
        </div>
        
        <div>
          <label>Image 1:</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 0)}
            required
          />
        </div>

        <div>
          <label>Image 2:</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 1)}
            required
          />
        </div>

        <Button type="primary" htmlType="submit" disabled={loading} style={{ marginTop: 20 }}>
          {loading ? "Yuklanmoqda..." : "Qo'shish"}
        </Button>
      </form>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <div style={{ marginTop: 20 }}>
        {formData.images.map((img, index) => (
          <img key={index} src={img} alt={`Preview ${index}`} width="100" height="100" />
        ))}
      </div>
    </Modal>
  );
};

export default AddDebtorModal;
