import React, { useEffect, useState } from 'react';

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Google } from '../../components/ui/icon/icons';
import { useBeginGoogleOauth } from './hooks/use-begin-google-oauth';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { isAsyncStateFulfilled } from '../../types/async-state';
import { OauthRedirectView } from './components/OauthRedirectView';
import { useAppSelector } from '../../store';
import { selectIsCurrentUserAuthenticated } from '../../store/user-settings';
import { Navigate } from 'react-router-native';

export const Login = () => {
  const isAuthenticated = useAppSelector(selectIsCurrentUserAuthenticated);

  const {
    asyncState: googleOauthBeginAsyncState,
    hasBeganGoogleOauth,
    beginGoogleOauth,
  } = useBeginGoogleOauth();

  const [provider, setProvider] = useState<'google'>();
  const [redirectUrl, setRedirectUrl] = useState<string>();

  const hasBeganOauth = hasBeganGoogleOauth;

  useEffect(() => {
    if (isAsyncStateFulfilled(googleOauthBeginAsyncState)) {
      setProvider('google');
      setRedirectUrl(googleOauthBeginAsyncState.data);
    }
  }, [googleOauthBeginAsyncState]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  if (redirectUrl && provider) {
    return (
      <OauthRedirectView oauthProvider={provider} redirectUrl={redirectUrl} />
    );
  }

  return (
    <View style={styles.body}>
      <Image
        style={styles.image}
        source={require('../../assets/achievable-512.png')}
      />

      <View style={styles.content}>
        <TouchableOpacity disabled={hasBeganOauth} onPress={beginGoogleOauth}>
          <Google />
          {!hasBeganGoogleOauth ? (
            <Text style={styles.googleLoginButtonText}>Login with Google</Text>
          ) : (
            <LoadingSpinner />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  googleLoginButtonText: {
    color: '#926bff',
    fontSize: 22,
  },
  image: {
    height: 200,
    width: 200,
  },
  body: {
    backgroundColor: '#000000',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});
