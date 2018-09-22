import * as React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { Align, Button, ErrorMessage, PageTemplate, PreviewImage } from 'ui';

import { User } from './types';
import { getUser } from './effects';
import { userSelector, userFetchedSelector, userErrorSelector } from './selectors';

interface Props {
  fetched: boolean;
  loadUser: (name: string) => void;
  user?: User;
  error?: string;
}

export function CommonPageView({ user, fetched, loadUser, error }: Props) {
  return (
    <PageTemplate title="React TypeScript App">
      {user && (
        <>
          <h1>{user.login} avatar:</h1>
          <PreviewImage src={user.avatar_url} />
        </>
      )}
      <Align>
        <Button onClick={() => loadUser('qwerty')}>load another user</Button>
        <Button onClick={() => loadUser('wronguserlogin')}>get error message</Button>
      </Align>
      {fetched && <span>fetching...</span>}
      {error && <ErrorMessage message={error} />}
    </PageTemplate>
  );
}

const mapStateToProps = createStructuredSelector({
  user: userSelector,
  fetched: userFetchedSelector,
  error: userErrorSelector
});

export const CommonPage = connect(
  mapStateToProps,
  { loadUser: getUser }
)(CommonPageView);
