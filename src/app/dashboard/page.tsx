"use client"

import React, { useState, useEffect } from "react";
import styles from './Dashboard.module.scss';
import classNames from "classnames";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Button from "@/components/Button";

const urlBase = 'http://localhost:5185/api';

// Status Dictionary - maps integer values to display strings
const STATUS_DICTIONARY = {
  0: "Очікується",
  1: "В дорозі",
  2: "Доставлено"
};

// For dropdown selection
const STATUS_OPTIONS = Object.entries(STATUS_DICTIONARY).map(([key, value]) => ({ 
  id: parseInt(key), 
  name: value 
}));

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const storedUserId = localStorage.getItem('userId');
    
    if (authStatus !== 'true') {
      router.push('/auth');
    } else {
      setIsAuthenticated(true);
      setUserId(storedUserId);
      fetchDeliveries(storedUserId);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userId');
    router.push('/auth');
  };

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [newEntry, setNewEntry] = useState({ 
    id: "",
    userId: userId,
    deliveryStartDate: "", 
    deliveryEndDate: "",
    company: "", 
    status: 0, 
    deliveryOrigin: "", 
    deliveryDestination: "" 
  });
  const [currentItem, setCurrentItem] = useState(null);
  const [editItem, setEditItem] = useState(null);

  const [filters, setFilters] = useState({
    company: "",
    status: "",
    deliveryOrigin: "",
    deliveryDestination: "",
    deliveryStartDate: "",
    deliveryEndDate: ""
  });

  // API Integration Functions
  const fetchDeliveries = async (uid) => {
    if (!uid) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(`${urlBase}/delivery/all?userId=${uid}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching deliveries: ${response.statusText}`);
      }
      
      const deliveries = await response.json();
      setData(deliveries);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch deliveries:", err);
      setError("Failed to load deliveries. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const addDelivery = async (delivery) => {
    try {
      const response = await fetch(`${urlBase}/delivery`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...delivery,
          userId: userId,
          // Ensure status is an integer
          status: parseInt(delivery.status)
        }),
      });

      if (!response.ok) {
        throw new Error(`Error adding delivery: ${response.statusText}`);
      }

      const newDelivery = await response.json();
      setData([...data, newDelivery]);
      return true;
    } catch (err) {
      console.error("Failed to add delivery:", err);
      setError("Failed to add delivery. Please try again later.");
      return false;
    }
  };

  const updateDelivery = async (delivery) => {
    try {
      // Ensure status is an integer
      const deliveryToUpdate = {
        ...delivery,
        status: parseInt(delivery.status)
      };
      
      const response = await fetch(`${urlBase}/delivery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deliveryToUpdate),
      });

      if (!response.ok) {
        throw new Error(`Error updating delivery: ${response.statusText}`);
      }

      const updatedDelivery = await response.json();
      updateDelivery.userId = userId;
      setData(data.map(item => item.id === updatedDelivery.id ? updatedDelivery : item));
      return true;
    } catch (err) {
      console.error("Failed to update delivery:", err);
      setError("Failed to update delivery. Please try again later.");
      return false;
    }
  };

  const deleteDelivery = async (deliveryId) => {
    try {
      const response = await fetch(`${urlBase}/delivery?DeliveryId=${deliveryId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error deleting delivery: ${response.statusText}`);
      }

      setData(data.filter(item => item.id !== deliveryId));
      return true;
    } catch (err) {
      console.error("Failed to delete delivery:", err);
      setError("Failed to delete delivery. Please try again later.");
      return false;
    }
  };

  // Filter the deliveries based on the selected filters
  const filteredData = data.filter((item) => {
    const statusFilter = filters.status !== "" ? parseInt(filters.status) : null;
    
    return (
      (filters.company ? item.company.includes(filters.company) : true) &&
      (statusFilter !== null ? item.status === statusFilter : true) &&
      (filters.deliveryOrigin ? item.deliveryOrigin.includes(filters.deliveryOrigin) : true) &&
      (filters.deliveryDestination ? item.deliveryDestination.includes(filters.deliveryDestination) : true) &&
      (filters.deliveryStartDate ? item.deliveryStartDate.includes(filters.deliveryStartDate) : true) && 
      (filters.deliveryEndDate ? item.deliveryEndDate.includes(filters.deliveryEndDate) : true)
    );
  });

  const getStatusCount = (statusId) => {
    return data.filter((item) => item.status === parseInt(statusId)).length;
  };

  const handleAdd = async () => {
    if (!newEntry.deliveryStartDate || !newEntry.company || !newEntry.deliveryOrigin || !newEntry.deliveryDestination) {
      alert("Будь ласка, заповніть всі обов'язкові поля!");
      return;
    }

    const success = await addDelivery(newEntry);
    if (success) {
      const newId = success.id;

      setIsAddVisible(false);
      setNewEntry({ 
        deliveryStartDate: "",
        deliveryEndDate: "",
        company: "", 
        status: 0, 
        deliveryOrigin: "", 
        deliveryDestination: "" 
      });
    }
  };

  const handleDetails = (item) => {
    setCurrentItem(item);
    setIsDetailsVisible(true);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setIsEditVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Ви впевнені, що хочете видалити це відправлення?")) {
      await deleteDelivery(id);
    }
  };

  const handleEditSave = async () => {
    if (!editItem.deliveryStartDate || !editItem.company || !editItem.deliveryOrigin || !editItem.deliveryDestination) {
      alert("Будь ласка, заповніть всі обов'язкові поля!");
      return;
    }

    const success = await updateDelivery(editItem);
    if (success) {
      setIsEditVisible(false);
      setEditItem(null);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const deliveryToUpdate = data.find(item => item.id === id);
    if (deliveryToUpdate) {
      const updatedDelivery = { ...deliveryToUpdate, status: parseInt(newStatus) };
      await updateDelivery(updatedDelivery);
    }
  };

  // Format dates for display
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <div className={classNames(styles.navbar)}>
        <Link href="/dashboard" className={classNames(styles.logo)}>Logistico</Link>
        <div className={classNames(styles.navbar_actions)}>
          <p>admin</p>
          <Button type='primary' onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      <div className={classNames(styles.wrapper)}>
        {error && (
          <div className={classNames(styles.error_message)}>
            {error}
          </div>
        )}

        <div className={classNames(styles.analytics)}>
          <div className={classNames(styles.analytics_card)}>
            <h4>{STATUS_DICTIONARY[2]}</h4>
            <p>{getStatusCount(2)}</p>
          </div>
          <div className={classNames(styles.analytics_card)}>
            <h4>{STATUS_DICTIONARY[1]}</h4>
            <p>{getStatusCount(1)}</p>
          </div>
          <div className={classNames(styles.analytics_card)}>
            <h4>{STATUS_DICTIONARY[0]}</h4>
            <p>{getStatusCount(0)}</p>
          </div>
        </div>

        <div className={classNames(styles.header_actions)}>
          <div className={classNames(styles.filters)}>
            <input 
              placeholder="Компанія"
              value={filters.company}
              onChange={(e) => setFilters({ ...filters, company: e.target.value })}
            />
            <select 
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">Статус</option>
              {STATUS_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
            <input 
              placeholder="Точка відправки"
              value={filters.deliveryOrigin}
              onChange={(e) => setFilters({ ...filters, deliveryOrigin: e.target.value })}
            />
            <input 
              placeholder="Точка доставки"
              value={filters.deliveryDestination}
              onChange={(e) => setFilters({ ...filters, deliveryDestination: e.target.value })}
            />
            <input 
              type="date"
              placeholder="Дата відправлення"
              value={filters.deliveryStartDate}
              onChange={(e) => setFilters({ ...filters, deliveryStartDate: e.target.value })}
              />
          </div>
          <Button type='primary' onClick={() => setIsAddVisible(true)}>Додати відправлення</Button>
        </div>

        {isLoading ? (
          <div className={classNames(styles.loading)}>Loading...</div>
        ) : (
          <table className={classNames(styles.table)} style={{ width: "100%", borderCollapse: "collapse"}}>
            <thead>
              <tr>
                <th>Дата відправлення</th>
                <th>Очікувана дата доставки</th>
                <th>Компанія</th>
                <th>Статус</th>
                <th>Точка відправки</th>
                <th>Точка доставки</th>
                <th className={classNames(styles.table_action_head)}>Дії</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id}>
                    <td>{formatDate(item.deliveryStartDate)}</td>
                    <td>{formatDate(item.deliveryEndDate)}</td>
                    <td>{item.company}</td>
                    <td>
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      >
                        {STATUS_OPTIONS.map((option) => (
                          <option key={option.id} value={option.id}>{option.name}</option>
                        ))}
                      </select>
                    </td>
                    <td>{item.deliveryOrigin}</td>
                    <td>{item.deliveryDestination}</td>
                    <td className={classNames(styles.table_action_row)}>
                      <Button type='primary' onClick={() => handleDetails(item)}>Деталі</Button>
                      <Button type='primary' onClick={() => handleEdit(item)}>Редагувати</Button>
                      <Button type='danger' onClick={() => handleDelete(item.id)}>Видалити</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className={classNames(styles.no_data)}>Немає даних для відображення</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {isAddVisible && (
          <div className={classNames(styles.modal, styles.modal__add, styles.modal__open)}>
            <div className={classNames(styles.modal_content)}>
              <div className={classNames(styles.modal_header)}>
                <h3>Додати нове відправлення</h3>
                <Button type='primary' onClick={() => setIsAddVisible(false)}>Скасувати</Button>
              </div>

              <div className={classNames(styles.modal_body)}>
                <div>
                  <label>Дата відправлення*</label>
                  <input 
                    type="date" 
                    onChange={(e) => setNewEntry({ ...newEntry, deliveryStartDate: e.target.value })} 
                    required 
                  />
                </div>
                <div>
                  <label>Дата доставки</label>
                  <input 
                    type="date" 
                    onChange={(e) => setNewEntry({ ...newEntry, deliveryEndDate: e.target.value })} 
                  />
                </div>
                <div>
                  <label>Компанія*</label>
                  <input 
                    placeholder="Компанія" 
                    onChange={(e) => setNewEntry({ ...newEntry, company: e.target.value })}
                    required 
                  />
                </div>
                <div>
                  <label>Статус</label>
                  <select 
                    value={newEntry.status} 
                    onChange={(e) => setNewEntry({ ...newEntry, status: e.target.value })}
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Точка відправки*</label>
                  <input 
                    placeholder="Точка відправки" 
                    onChange={(e) => setNewEntry({ ...newEntry, deliveryOrigin: e.target.value })}
                    required 
                  />
                </div>
                <div>
                  <label>Точка доставки*</label>
                  <input 
                    placeholder="Точка доставки" 
                    onChange={(e) => setNewEntry({ ...newEntry, deliveryDestination: e.target.value })}
                    required 
                  />
                </div>
              </div>

              <div className={classNames(styles.modal_footer)}>
                <Button type='primary' block onClick={handleAdd}>Додати</Button>
              </div>
            </div>
          </div>
        )}

        {isEditVisible && editItem && (
          <div className={classNames(styles.modal, styles.modal__edit, styles.modal__open)}>
            <div className={classNames(styles.modal_content)}>
              <div className={classNames(styles.modal_header)}>
                <h3>Редагувати відправлення</h3>
                <Button type='primary' onClick={() => setIsEditVisible(false)}>Закрити</Button>
              </div>

              <div className={classNames(styles.modal_body)}>
                <div>
                  <label>Дата відправлення*</label>
                  <input 
                    type="date"
                    value={editItem.deliveryStartDate?.split('T')[0]}
                    onChange={(e) => setEditItem({ ...editItem, deliveryStartDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label>Фактична дата доставки</label>
                  <input 
                    type="date"
                    value={editItem.deliveryEndDate?.split('T')[0]}
                    onChange={(e) => setEditItem({ ...editItem, deliveryEndDate: e.target.value })}
                  />
                </div>
                <div>
                  <label>Компанія*</label>
                  <input 
                    value={editItem.company}
                    onChange={(e) => setEditItem({ ...editItem, company: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label>Статус</label>
                  <select 
                    value={editItem.status}
                    onChange={(e) => setEditItem({ ...editItem, status: e.target.value })}
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Точка відправки*</label>
                  <input 
                    value={editItem.deliveryOrigin}
                    onChange={(e) => setEditItem({ ...editItem, deliveryOrigin: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label>Точка доставки*</label>
                  <input 
                    value={editItem.deliveryDestination}
                    onChange={(e) => setEditItem({ ...editItem, deliveryDestination: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className={classNames(styles.modal_footer)}>
                <Button type='primary' block onClick={handleEditSave}>Зберегти</Button>
              </div>
            </div>
          </div>
        )}

        {isDetailsVisible && currentItem && (
          <div className={classNames(styles.modal, styles.modal__details, styles.modal__open)}>
            <div className={classNames(styles.modal_content)}>
              <div className={classNames(styles.modal_header)}>
                <h3>Деталі відправлення</h3>
                <Button type='primary' onClick={() => setIsDetailsVisible(false)}>Закрити</Button>
              </div>

              <div className={classNames(styles.modal_body)}>
                <p><strong>ID:</strong> {currentItem.id}</p>
                <p><strong>Дата відправлення:</strong> {formatDate(currentItem.deliveryStartDate)}</p>
                <p><strong>Фактична дата доставки:</strong> {formatDate(currentItem.deliveryEndDate)}</p>
                <p><strong>Компанія:</strong> {currentItem.company}</p>
                <p><strong>Статус:</strong> {STATUS_DICTIONARY[currentItem.status]}</p>
                <p><strong>Точка відправки:</strong> {currentItem.deliveryOrigin}</p>
                <p><strong>Точка доставки:</strong> {currentItem.deliveryDestination}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;