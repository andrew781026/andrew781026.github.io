package org.primefaces.showcase.view.data.datatable;

import java.io.Serializable;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import org.primefaces.showcase.view.data.datatable.Car;
import org.primefaces.showcase.view.data.datatable.CarService;

@ManagedBean(name="dtBasicView")
@ViewScoped
public class BasicView implements Serializable {

    private List<Car> cars;
    private Car newCar;

    @ManagedProperty("#{carService}")
    private CarService service;

    @PostConstruct
    public void init() {
        cars = service.createCars(10);
        newCar = new Car();
    }

    public List<Car> getCars() {
        return cars;
    }

    public Car getNewCar() {
        return newCar;
    }

    public void setNewCar(Car newCar){
        this.newCar = newCar;
    }

    public void addCarToTable() {
        cars.add(newCar);
    }

    public String deleteAction(Car car) {
        cars.remove(car);
        return null;
    }

    public void setService(CarService service) {
        this.service = service;
    }
}