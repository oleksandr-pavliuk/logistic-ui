"use client"

import React, { useState, useEffect } from "react";
import styles from './Dashboard.module.scss';
import classNames from "classnames";
import { shipmentData } from '@/assets/data/data';
import { useRouter } from 'next/navigation';
import Link from "next/link";

const STATUS_OPTIONS = ["Очікується", "В дорозі", "Доставлено"];

const Dashboard = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus !== 'true') {

      router.push('/auth');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // if (!isAuthenticated) {
  //   return null;
  // }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/auth');
  };

  const [data, setData] = useState(shipmentData);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [newEntry, setNewEntry] = useState({ date: "", company: "", status: "", origin: "", destination: "" });
  const [currentItem, setCurrentItem] = useState(null);
  const [editItem, setEditItem] = useState(null);

  const [filters, setFilters] = useState({
    company: "",
    status: "",
    origin: "",
    destination: "",
    date: "",
  });

  const filteredData = data.filter((item) => {
    return (
      (filters.company ? item.company.includes(filters.company) : true) &&
      (filters.status ? item.status.includes(filters.status) : true) &&
      (filters.origin ? item.origin.includes(filters.origin) : true) &&
      (filters.destination ? item.destination.includes(filters.destination) : true) &&
      (filters.date ? item.date.includes(filters.date) : true)
    );
  });

  const getStatusCount = (status) => {
    return data.filter((item) => item.status === status).length;
  };

  const handleAdd = () => {
    if (!newEntry.date || !newEntry.company || !newEntry.status || !newEntry.origin || !newEntry.destination) {
      alert("Будь ласка, заповніть всі поля!");
      return;
    }

    setData([...data, { id: Date.now(), ...newEntry }]);
    setIsAddVisible(false);
    setNewEntry({ date: "", company: "", status: "", origin: "", destination: "" });
  };

  const handleDetails = (item) => {
    setCurrentItem(item);
    setIsDetailsVisible(true);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setIsEditVisible(true);
  };

  const handleEditSave = () => {
    if (!editItem.date || !editItem.company || !editItem.status || !editItem.origin || !editItem.destination) {
      alert("Будь ласка, заповніть всі поля!");
      return;
    }

    const updatedData = data.map((item) =>
      item.id === editItem.id ? { ...editItem } : item
    );
    setData(updatedData);
    setIsEditVisible(false);
    setEditItem(null);
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedData = data.map(item =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setData(updatedData);
  };

  return (
    <>
      <div className={classNames(styles.navbar)}>
        <Link href="/dashboard" className={classNames(styles.logo)}>Logistico</Link>
        <div className={classNames(styles.navbar_actions)}>
          <p>admin</p>
          <button className={classNames(styles.button)} onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className={classNames(styles.wrapper)}>

        <div className={classNames(styles.analytics)}>
          <div className={classNames(styles.analytics_card)}>
            <h4>{STATUS_OPTIONS[2]}</h4>
            <p>{getStatusCount(STATUS_OPTIONS[2])}</p>
          </div>
          <div className={classNames(styles.analytics_card)}>
            <h4>{STATUS_OPTIONS[1]}</h4>
            <p>{getStatusCount(STATUS_OPTIONS[1])}</p>
          </div>
          <div className={classNames(styles.analytics_card)}>
            <h4>{STATUS_OPTIONS[0]}</h4>
            <p>{getStatusCount(STATUS_OPTIONS[0])}</p>
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
              {STATUS_OPTIONS.map((status, index) => (
                <option key={index} value={status}>{status}</option>
              ))}
            </select>
            <input 
              placeholder="Точка відправки"
              value={filters.origin}
              onChange={(e) => setFilters({ ...filters, origin: e.target.value })}
            />
            <input 
              placeholder="Точка доставки"
              value={filters.destination}
              onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
            />
            <input 
              type="date"
              placeholder="Дата"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            />
          </div>
          <button onClick={() => setIsAddVisible(true)} className={classNames(styles.button)} style={{ marginBottom: "10px" }}>До дати відправлення</button>
        </div>

        <table className={classNames(styles.table)} style={{ width: "100%", borderCollapse: "collapse"}}>
          <thead>
            <tr>
              <th>Дата відправлення</th>
              <th>Компанія</th>
              <th>Статус</th>
              <th>Точка відправки</th>
              <th>Точка доставки</th>
              <th className={classNames(styles.table_action_head)}>Дії</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.company}</td>
                <td>
                  <select
                    value={item.status}
                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                  >
                    {STATUS_OPTIONS.map((status, index) => (
                      <option key={index} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td>{item.origin}</td>
                <td>{item.destination}</td>
                <td className={classNames(styles.table_action_row)}>
                  <button className={classNames(styles.button)} onClick={() => handleDetails(item)}>Деталі</button>
                  <button className={classNames(styles.button)} onClick={() => handleEdit(item)}>Редагувати</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isAddVisible && (
          <div className={classNames(styles.modal, styles.modal__add, styles.modal__open)}>
            <div className={classNames(styles.modal_content)}>
              <div className={classNames(styles.modal_header)}>
                <h3>Додати нове відправлення</h3>
                <button className={classNames(styles.button)} onClick={() => setIsAddVisible(false)} style={{ marginLeft: "10px" }}>Скасувати</button>
              </div>

              <div className={classNames(styles.modal_body)}>
                <input type="date" placeholder="Дата відправлення" onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })} />
                <input placeholder="Компанія" onChange={(e) => setNewEntry({ ...newEntry, company: e.target.value })} />
                <select onChange={(e) => setNewEntry({ ...newEntry, status: e.target.value })}>
                  {STATUS_OPTIONS.map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                  ))}
                </select>
                <input placeholder="Точка відправки" onChange={(e) => setNewEntry({ ...newEntry, origin: e.target.value })} />
                <input placeholder="Точка доставки" onChange={(e) => setNewEntry({ ...newEntry, destination: e.target.value })} />
              </div>

              <div className={classNames(styles.modal_footer)}>
                <button className={classNames(styles.button)} onClick={handleAdd}>Додати</button>
              </div>
            </div>
          </div>
        )}


        {isEditVisible && editItem && (
          <div className={classNames(styles.modal, styles.modal__edit, styles.modal__open)}>
            <div className={classNames(styles.modal_content)}>
              <div className={classNames(styles.modal_header)}>
                <h3>Редагувати відправлення</h3>
                <button className={classNames(styles.button)} onClick={() => setIsEditVisible(false)}>Закрити</button>
              </div>

              <div className={classNames(styles.modal_body)}>
                <input 
                  type="date"
                  value={editItem.date}
                  onChange={(e) => setEditItem({ ...editItem, date: e.target.value })}
                />
                <input 
                  value={editItem.company}
                  onChange={(e) => setEditItem({ ...editItem, company: e.target.value })}
                />
                <select 
                  value={editItem.status}
                  onChange={(e) => setEditItem({ ...editItem, status: e.target.value })}
                >
                  {STATUS_OPTIONS.map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                  ))}
                </select>
                <input 
                  value={editItem.origin}
                  onChange={(e) => setEditItem({ ...editItem, origin: e.target.value })}
                />
                <input 
                  value={editItem.destination}
                  onChange={(e) => setEditItem({ ...editItem, destination: e.target.value })}
                />
              </div>

              <div className={classNames(styles.modal_footer)}>
                <button className={classNames(styles.button)} onClick={handleEditSave}>Зберегти</button>
              </div>
            </div>
          </div>
        )}

        {isDetailsVisible && currentItem && (
          <div className={classNames(styles.modal, styles.modal__details, styles.modal__open)}>
            <div className={classNames(styles.modal_content)}>
              <div className={classNames(styles.modal_header)}>
                <h3>Деталі відправлення</h3>
                <button className={classNames(styles.button)} onClick={() => setIsDetailsVisible(false)}>Закрити</button>
              </div>

              <div className={classNames(styles.modal_body)}>
                <p><strong>Дата відправлення:</strong> {currentItem.date}</p>
                <p><strong>Компанія:</strong> {currentItem.company}</p>
                <p><strong>Статус:</strong> {currentItem.status}</p>
                <p><strong>Точка відправки:</strong> {currentItem.origin}</p>
                <p><strong>Точка доставки:</strong> {currentItem.destination}</p>
              </div>

            </div>
          </div>
        )}
        </div>
    </>
  );
};

export default Dashboard;
