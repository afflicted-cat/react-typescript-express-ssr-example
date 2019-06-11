import * as React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { Align, Button, ErrorMessage, PreviewImage } from '@core/ui/atoms';

import { User } from './types';
import { getUser } from './effects';
import { userSelector, userFetchedSelector, userErrorSelector } from './selectors';

interface CommonPageProps {
  user?: User;
  error?: string;
  fetched: boolean;
  onClick: (name: string) => void;
}

const mapStateToProps = createStructuredSelector({
  user: userSelector,
  fetched: userFetchedSelector,
  error: userErrorSelector
});

const enhance = connect(
  mapStateToProps,
  { onClick: getUser }
);

export function CommonPage({ user, fetched, onClick, error }: CommonPageProps) {
  return (
    <React.Fragment>
      {user && (
        <React.Fragment>
          <h1>{user.login} avatar:</h1>
          <PreviewImage src={user.avatar_url} />
        </React.Fragment>
      )}
      <Align>
        <Button onClick={() => onClick('qwerty')}>load another user</Button>
        <Button onClick={() => onClick('wronguserlogin')}>get error message</Button>
      </Align>
      {fetched && <span>fetching...</span>}
      {error && <ErrorMessage message={error} />}
    </React.Fragment>
  );
}

export const CommonPageContainer = enhance(CommonPage);
