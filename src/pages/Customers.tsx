import { useEffect, useState } from "react";
import { SearchOutlined,  StarFilled, StarOutlined, UserAddOutlined } from "@ant-design/icons";
import {  Alert, message } from "antd";
import AddDebtorModal from "../components/AddDebtorModal";
import useDebtor from "../hooks/useDebtor";
import "../styles/pages/Customers.css";
import { useNavigate } from "react-router";

const Customers = () => {
  const { debtors, error, addDebtor, refetch } = useDebtor();
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddDebtor = async (debtorData: any) => {
    try {
      await addDebtor(debtorData);
      message.success("Qarzdor muvaffaqiyatli qo'shildi!");
      setIsModalOpen(false);
      refetch();
    } catch (err) {
      message.error("Qarzdorni qo'shishda xatolik yuz berdi.");
    }
  };



  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <section className="customers">
      <div className="container">
        <div className="customers__search">
          <form className="customers__search-form">
            <input type="text" placeholder="Mijozlarni qidirish..." />
            <SearchOutlined className="customers__search-icon" />
          </form>

        </div>

        {error ? (
          <Alert message={error} type="error" />
        ) : (
          <div className="customers__list">
            {Array.isArray(debtors) && debtors.length > 0 ? (
              debtors.map((customer) => {
                const totalDebt = customer.debts.reduce(
                  (sum, debt) => sum + parseFloat(debt.debt_sum || "0"),
                  0
                );
                return (
                  <div key={customer.id} className="customers__item" onClick={() => navigate(`/customer/${customer.id}`)}>
                    <div className="customers__info">
                      <h3 className="customers__name">{customer.full_name}</h3>
                      <p className="customers__phone">
                        {customer.phone_numbers.length > 0 ? customer.phone_numbers[0].number : "Telefon raqami yo'q"}
                      </p>
                      <p className="customers__debt-label">Jami nasiya:</p>
                      <p className={`customers__debt ${totalDebt < 0 ? "negative" : "positive"}`}>
                        {totalDebt.toLocaleString()} so'm
                      </p>
                    </div>
                    <div className="customers__favorite" onClick={(e) => { e.stopPropagation(); toggleFavorite(customer.id); }}>
                      {favorites[customer.id] ? <StarFilled className="star-icon active" /> : <StarOutlined className="star-icon" />}
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Hech qanday mijoz topilmadi.</p>
            )}
          </div>
        )}

        <button className="customers__add" onClick={() => setIsModalOpen(true)}>
          <UserAddOutlined />
          Yaratish
        </button>
      </div>

      <AddDebtorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddDebtor={handleAddDebtor} />
    </section>
  );
};

export default Customers;

