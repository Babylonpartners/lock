import Dispatcher from '../control/dispatcher';
import { ActionTypes } from '../control/constants';
import LockWebAPI from './web_api';
import * as Gravatar from '../gravatar/index';

export default {
  setupLock: function(lockID, clientID, domain, options) {
    Dispatcher.dispatch({
      type: ActionTypes.SETUP_LOCK,
      lockID: lockID,
      clientID: clientID,
      domain: domain,
      options: options
    });

    LockWebAPI.setupClient(lockID, clientID, domain, options);
  },

  changeEmail: function(lockID, email) {
    Dispatcher.dispatch({
      type: ActionTypes.CHANGE_EMAIL,
      lockID: lockID,
      email: email
    });

    Gravatar.profile(
      email,
      (email, entry) => {
        this.receiveGravatarDisplayName(email, entry.displayName);
      },
      (email) => {
        this.receiveGravatarDisplayNameError(email);
      }
    );

    Gravatar.img(
      email,
      (email, img) => {
        this.receiveGravatarImage(email, img.src);
      },
      (email) => {
        this.receiveGravatarImageError(email);
      }
    );
  },

  changePassword: function(lockID, password) {
    Dispatcher.dispatch({
      type: ActionTypes.CHANGE_PASSWORD,
      lockID: lockID,
      password: password
    });
  },

  inputEmail: function(lockID, email) {
    Dispatcher.dispatch({
      type: ActionTypes.INPUT_EMAIL,
      lockID: lockID,
      email: email
    });
  },

  inputPassword: function(lockID, password) {
    Dispatcher.dispatch({
      type: ActionTypes.INPUT_PASSWORD,
      lockID: lockID,
      password: password
    });
  },

  signIn: function(lockID) {
    Dispatcher.dispatch({
      type: ActionTypes.SIGN_IN,
      lockID: lockID
    });

    LockWebAPI.signIn(lockID);
  },

  successfulSignIn: function(lockID, signIn) {
    Dispatcher.dispatch({
      type: ActionTypes.SUCCESSFUL_SIGN_IN,
      lockID: lockID,
      signIn: signIn
    });
  },

  failedSignIn: function(lockID, error) {
    Dispatcher.dispatch({
      type: ActionTypes.FAILED_SIGN_IN,
      lockID: lockID,
      error: error
    });
  },

  showLock: function(lockID, options) {
    Dispatcher.dispatch({
      type: ActionTypes.SHOW_LOCK,
      lockID: lockID,
      options: options
    });
  },

  hideLock: function(lockID) {
    Dispatcher.dispatch({
      type: ActionTypes.HIDE_LOCK,
      lockID: lockID
    });
  },

  invalidateCredentials: function(lockID, validations) {
    Dispatcher.dispatch({
      type: ActionTypes.INVALIDATE_CREDENTIALS,
      lockID: lockID,
      validations: validations
    });
  },

  receiveGravatarDisplayName: function(email, displayName) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_GRAVATAR_DISPLAY_NAME,
      email: email,
      displayName: displayName
    });
  },

  receiveGravatarDisplayNameError: function(email) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_GRAVATAR_DISPLAY_NAME_ERROR,
      email: email
    });
  },

  receiveGravatarImage: function(email, url) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_GRAVATAR_IMAGE,
      email: email,
      url: url
    });
  },

  receiveGravatarImageError: function(email) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_GRAVATAR_IMAGE_ERROR,
      email: email
    });
  }
}
