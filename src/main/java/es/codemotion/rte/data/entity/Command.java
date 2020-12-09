package es.codemotion.rte.data.entity;

import java.time.LocalTime;

import javax.persistence.Entity;

import es.codemotion.rte.data.AbstractEntity;

@Entity
public class Command extends AbstractEntity {

  Integer tableNumber;
  String type;
  String description;
  Integer quantity;
  LocalTime hour;
  boolean served;

  public Integer getTableNumber() {
    return tableNumber;
  }

  public void setTableNumber(Integer tableNumber) {
    this.tableNumber = tableNumber;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Integer getQuantity() {
    return quantity;
  }

  public void setQuantity(Integer quantity) {
    if (quantity == null || quantity == 0) {
      quantity = 1;
    }
    this.quantity = quantity;
  }

  public boolean isServed() {
    return served;
  }

  public void setServed(boolean served) {
    this.served = served;
  }

  public LocalTime getHour() {
    return hour;
  }

  public void setHour(LocalTime hour) {
    if (hour == null) {
      hour = LocalTime.now();
    }
    this.hour = hour;
  }


}
