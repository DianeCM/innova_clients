import { useState, useCallback } from "react";
import { validatePassword, validateUsername } from "../utils/validations-utlis";
import { loginUser } from "../utils/users-utils";
import { useNotification } from "../hooks/notification-context";


const useLoginViewModel = ({ state, dispatch, navigate }) => {
  const [userInfo, setUserInfo] = useState( {
    username: state.remember ? state.username : '',
    password: '',
    remember: state.remember
  });
  const [errors, setErrors] = useState({ username: '', password: '' });
  const { showNotification } = useNotification()
  const [loading, setLoading] = useState(false)

  const validateField = useCallback((name, value) => {
    if (name === 'username') {
      const validatedUsername = validateUsername(value);
      return validatedUsername.isValid() ? '' : validatedUsername.getErrors().join(', ');
    }
    if (name === 'password') {
      const validatedPassword = validatePassword(value);
      return validatedPassword.isValid() ? '' : validatedPassword.getErrors().join(', ');
    }
    return '';
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setUserInfo((prev) => ({ ...prev, [name]: fieldValue }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, fieldValue) }));
  };

  const isFormValid = !Object.values(errors).some((error) => error) &&
    userInfo.username &&
    userInfo.password;

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    if (!isFormValid) {
      showNotification("Completa los campos con error antes de registrarte", 'error')
      return;
    }
    const response = await loginUser({ username: userInfo.username, password: userInfo.password });
    setLoading(false)

    if (!response.isValid()) {
      showNotification(response.error || "Error desconocido al iniciar sesión", 'error')
      return;
    }

    const { token, userid, expiration, username, message } = response;
    dispatch({ type: "SET_TOKEN", payload: token });
    dispatch({ type: "SET_USERID", payload: userid });
    dispatch({ type: "SET_ISLOGGED", payload: true });
    dispatch({ type: "SET_USERNAME", payload: username });
    dispatch({ type: "SET_REMEMBER", payload: userInfo.remember})

    showNotification(message, 'success')
    navigate("/")
  };

  return {
    userInfo,
    handleChange,
    onSubmit,
    errors,
    loading
  };
};

export default useLoginViewModel;
