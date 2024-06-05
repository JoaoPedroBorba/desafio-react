// src/redux/actions/employeeActions.js
import { getEmployees, addEmployee as apiAddEmployee, updateEmployee as apiUpdateEmployee, removeEmployee as apiRemoveEmployee } from '../../services/api';

export const fetchEmployees = () => async (dispatch) => {
  dispatch({ type: 'FETCH_EMPLOYEES_REQUEST' });
  try {
    const response = await getEmployees();
    dispatch({ type: 'FETCH_EMPLOYEES_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Failed to fetch employees', error);
    dispatch({ type: 'FETCH_EMPLOYEES_FAILURE' });
  }
};

export const addEmployee = (employee) => async (dispatch) => {
  try {
    const response = await apiAddEmployee(employee);
    dispatch({ type: 'ADD_EMPLOYEE_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Failed to add employee', error);
    dispatch({ type: 'ADD_EMPLOYEE_FAILURE' });
  }
};

export const updateEmployee = (id, employee) => async (dispatch) => {
  try {
    const response = await apiUpdateEmployee(id, employee);
    dispatch({ type: 'UPDATE_EMPLOYEE_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Failed to update employee', error);
    dispatch({ type: 'UPDATE_EMPLOYEE_FAILURE' });
  }
};

export const removeEmployee = (id) => async (dispatch) => {
  try {
    await apiRemoveEmployee(id);
    dispatch({ type: 'REMOVE_EMPLOYEE_SUCCESS', payload: id });
  } catch (error) {
    console.error('Failed to remove employee', error);
    dispatch({ type: 'REMOVE_EMPLOYEE_FAILURE' });
  }
};
