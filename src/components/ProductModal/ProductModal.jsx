import React, { useState, useEffect } from 'react';
import './ProductModal.scss';

export default function ProductModal({ open, mode, initialProduct, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    stock: '',
    type: 'key'
  });

  useEffect(() => {
    if (open && initialProduct) {
      setFormData({
        name: initialProduct.name || '',
        category: initialProduct.category || '',
        description: initialProduct.description || '',
        price: initialProduct.price || '',
        stock: initialProduct.stock || '',
        type: initialProduct.type || 'key'
      });
    } else if (open) {
      setFormData({
        name: '',
        category: '',
        description: '',
        price: '',
        stock: '',
        type: 'key'
      });
    }
  }, [open, initialProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Введите название товара');
      return;
    }
    if (!formData.category.trim()) {
      alert('Введите категорию');
      return;
    }
    
    const price = Number(formData.price);
    if (isNaN(price) || price < 0) {
      alert('Введите корректную цену');
      return;
    }
    
    const stock = Number(formData.stock);
    if (isNaN(stock) || stock < 0) {
      alert('Введите корректное количество');
      return;
    }

    onSubmit({
      id: initialProduct?.id,
      name: formData.name.trim(),
      category: formData.category.trim(),
      description: formData.description.trim(),
      price,
      stock,
      type: formData.type
    });
  };

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h2>{mode === 'edit' ? 'Редактировать товар' : 'Новый товар'}</h2>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Например: Windows 11 Pro"
              autoFocus
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Категория *</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="ОС / Софт / Игры"
              />
            </div>
            
            <div className="form-group">
              <label>Тип товара</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="key">🔑 Лицензионный ключ</option>
                <option value="subscription">📅 Подписка</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Описание</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Описание товара..."
              rows="3"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Цена (₽) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="4990"
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label>Количество *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="100"
                min="0"
              />
            </div>
          </div>
          
          <div className="modal__footer">
            <button type="button" className="btn" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn--primary">
              {mode === 'edit' ? 'Сохранить' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}