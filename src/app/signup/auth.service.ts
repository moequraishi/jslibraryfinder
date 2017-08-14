import * as firebase from 'firebase';
import * as $ from 'jquery';

export class AuthService {

    userDataResponse: any;

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
            response => $('.sign-up').html('You have successfuly signed up, please login!').fadeIn('slow')
        )
        .catch(
            error => $('.sign-up').html(error.message).fadeIn('slow')
        );
    }

    loginUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
//            response => console.log(response)
        )
        .catch(
            error => $('.login-error').html(error.message).fadeIn('slow')
        );
    }

    getToken() {
        return firebase.auth().currentUser.getIdToken();
    }
}
