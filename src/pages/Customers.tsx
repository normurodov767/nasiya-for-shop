import { useState } from "react";
import { SearchOutlined, StarFilled, StarOutlined, UserAddOutlined } from "@ant-design/icons";
import AddDebtorModal from "../components/AddDebtorModal";
import useDebtor from "../hooks/useDebtor";
import '../styles/pages/Customers.css'

const Customers = () => {
  const { debtors, loading, } = useDebtor();
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  const [isModalOpen, setIsModalOpen] = useState(false);



  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="customers">
      <div className="container">
        <div className="customers__search">
          <form className="customers__search-form">
            <input type="text" placeholder="Mijozlarni qidirish..." />
            <SearchOutlined className="customers__search-icon" />
          </form>
        </div>

          <div className="customers__list">
            {Array.isArray(debtors) && debtors.length > 0 ? (
              debtors.map((customer) => {
                const totalDebt = customer.debts.reduce(
                  (sum, debt) => sum + parseFloat(debt.debt_sum || "0"),
                  0
                );
                return (
                  <div key={customer.id} className="customers__item">
                    <div className="customers__info">
                      <h3 className="customers__name">{customer.full_name}</h3>
                      <p className="customers__phone">
                        {customer.phone_numbers.length > 0 ? customer.phone_numbers[0].number : "Telefon raqami yo‘q"}
                      </p>
                      <p className="customers__debt-label">Total Nation:</p>
                      <p className={`customers__debt ${totalDebt < 0 ? "negative" : "positive"}`}>
                        {totalDebt.toLocaleString()} so'm
                      </p>
                    </div>
                    <div className="customers__favorite" onClick={() => toggleFavorite(customer.id)}>
                      {favorites[customer.id] ? <StarFilled className="star-icon active" /> : <StarOutlined className="star-icon" />}
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No customers found.</p>
            )}
          </div>
        

        {!loading && (
          <button className="customers__add" onClick={() => setIsModalOpen(true)}>
            <UserAddOutlined />
            Add new
          </button>
        )}
      </div>

      <AddDebtorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Customers;
