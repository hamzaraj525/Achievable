import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useLocation, useNavigate } from 'react-router-native';

export const useHandleAndroidBackButton = (onBack?: () => void) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBack = () => {
      if (onBack) {
        onBack();
        return true;
      }

      if (location.key === 'default') {
        BackHandler.exitApp();
        return true;
      } else {
        navigate(-1);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBack
    );

    return () => backHandler.remove();
  }, [navigate, location]);
};
