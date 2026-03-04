import { useState, useContext } from "react";
import Section from "../../ui/Section";
import FormGrid from "../../ui/FormGrid";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import ResultBox from "../../ui/ResultBox";
import ServiceContext from "../../../context/ServiceContext";

const ServicesSection = () => {
  const { getAllServices, getServiceById, addService, updateService, deleteService } = useContext(ServiceContext);

  // ---------- STATE ----------
  const [allServicesResult, setAllServicesResult] = useState(null);

  const [serviceId, setServiceId] = useState("");
  const [serviceResult, setServiceResult] = useState(null);

  const [addForm, setAddForm] = useState({ name: "", price: "" });
  const [addResult, setAddResult] = useState(null);

  const [updateForm, setUpdateForm] = useState({ id: "", name: "", price: "" });
  const [updateResult, setUpdateResult] = useState(null);

  const [deleteId, setDeleteId] = useState("");
  const [deleteResult, setDeleteResult] = useState(null);

  // ---------- HANDLERS ----------
  const handleAddChange = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleUpdateChange = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const handleGetAll = async () => {
    const res = await getAllServices();
    setAllServicesResult(res);
  };

  const handleGetById = async () => {
    const res = await getServiceById(serviceId);
    setServiceResult(res);
  };

  const handleAdd = async () => {
    const res = await addService(addForm.name, addForm.price);
    setAddResult(res);
  };

  const handleUpdate = async () => {
    const res = await updateService( updateForm.id, updateForm.name, updateForm.price );
    setUpdateResult(res);
  };

  const handleDelete = async () => {
    const res = await deleteService(deleteId);
    setDeleteResult(res);
  };

  return (
    <Section title="Services">

      {/* ===== GET ALL ===== */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h3 className="font-semibold text-lg mb-1">Get All Services</h3>

        <Button onClick={handleGetAll} className="mb-2">Get All Services</Button>

        <ResultBox data={allServicesResult} />
      </div>

      {/* ===== GET BY ID ===== */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h3 className="font-semibold text-lg mb-1">Get Service</h3>

        <FormGrid>
          <Input placeholder="Service ID" value={serviceId} onChange={(e) => setServiceId(e.target.value)} />
        </FormGrid>

        <Button onClick={handleGetById} className="mb-2">Get Service</Button>

        <ResultBox data={serviceResult} />
      </div>

      {/* ===== ADD ===== */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h3 className="font-semibold text-lg mb-1">Add Service</h3>
        <p className="text-sm text-gray-500 mb-2">
          Allowed Roles: Admin, Manager
        </p>

        <FormGrid>
          <Input name="name" placeholder="Service Name" value={addForm.name} onChange={handleAddChange} />
          <Input name="price" placeholder="Service Price" value={addForm.price} onChange={handleAddChange} />
        </FormGrid>

        <Button onClick={handleAdd} className="mb-2">Add Service</Button>

        <ResultBox data={addResult} />
      </div>

      {/* ===== UPDATE ===== */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h3 className="font-semibold text-lg mb-1">Update Service</h3>
        <p className="text-sm text-gray-500 mb-2">Allowed Roles: Admin, Manager</p>

        <FormGrid>
          <Input name="id" placeholder="Service ID" value={updateForm.id} onChange={handleUpdateChange} />
          <Input name="name" placeholder="Service Name" value={updateForm.name} onChange={handleUpdateChange} />
          <Input name="price" placeholder="Service Price" value={updateForm.price} onChange={handleUpdateChange} />
        </FormGrid>

        <Button onClick={handleUpdate} className="mb-2">Update Service</Button>

        <ResultBox data={updateResult} />
      </div>

      {/* ===== DELETE ===== */}
      <div>
        <h3 className="font-semibold text-lg mb-1">Delete Service</h3>
        <p className="text-sm text-gray-500 mb-2">Allowed Roles: Admin, Manager</p>

        <FormGrid>
          <Input placeholder="Service ID" value={deleteId} onChange={(e) => setDeleteId(e.target.value)} />
        </FormGrid>

        <Button onClick={handleDelete} variant="danger" className="mb-2">Delete Service</Button>

        <ResultBox data={deleteResult} />
      </div>

    </Section>
  );
};

export default ServicesSection;