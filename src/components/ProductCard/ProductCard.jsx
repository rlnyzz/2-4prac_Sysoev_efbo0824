import React from 'react';
import './ProductCard.scss';

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="product-card">
      <div className="product-card__badge">
        {product.type === 'subscription' ? '📅 Подписка' : '🔑 Ключ'}
      </div>
      
      <h3 className="product-card__name">{product.name}</h3>
      <span className="product-card__category">{product.category}</span>
      
      <p className="product-card__description">{product.description}</p>
      
      <div className="product-card__footer">
        <div className="product-card__price">{product.price.toLocaleString()} ₽</div>
        <div className={`product-card__stock ${product.stock < 10 ? 'low' : ''}`}>
          📦 {product.stock} шт.
        </div>
      </div>
      
      <div className="product-card__actions">
        <button className="btn btn--edit" onClick={() => onEdit(product)}>
          ✏️ Редактировать
        </button>
        <button className="btn btn--delete" onClick={() => onDelete(product.id)}>
          🗑️ Удалить
        </button>
      </div>
    </div>
  );
}