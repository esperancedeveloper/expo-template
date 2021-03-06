import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput,Dimensions, TouchableOpacity,ActivityIndicator,Animated } from 'react-native';
import Icons from '@expo/vector-icons/Ionicons';
import {connect} from 'react-redux';
import colors from '../api/color';
const {width} = Dimensions.get('window');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        identifiant:'',
        password:'',
        isLoading:false,
        showPass:false,
        messageErreur:'',
        pan: new Animated.Value(-100)
    };
  }
  componentDidMount() {
      Animated.spring(this.state.pan,{
          toValue:0,
          useNativeDriver:true,
          delay:100
      }).start();
  }

  onChangeText = (key,value) => {
      this.setState({
          messageErreur:'',
          [key]:value
      })
  }
  showPassword = () => {
      this.setState(prevState => ({
          showPass:!prevState.showPass,
      }))
  }
  login = () => {
   /* this.setState({
        isLoading:true
    })*/
    this.props.navigation.navigate('Auth',{screen:'Home'});
  }
  renderButtonLogin = () => {
    if (this.state.isLoading) {
        return (
            <ActivityIndicator
                animating={true}
                size='large'
                color='#fff'
            />
        )
    }
    return (
        <Text style={styles.btnText}>Valider</Text>
    )
  }

  render() {
    const {showPass,identifiant,password,messageErreur} = this.state
    return (
      <Animated.View style={[styles.container,{transform:[{translateY:this.state.pan}]}]}>
        <View style={styles.inputContainer}>
            <Icons 
                name='ios-person'
                size={28}
                color = {colors.primary}
                style = {styles.inputIcon}
            />
            <TextInput
                style={styles.input}
                onChangeText = {text => this.onChangeText('identifiant',text)}
                value={identifiant}
                placeholder="Identifiant"
                placeholderTextColor='black'
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.secondTextInput.focus()}
                autoCapitalize='none'
                returnKeyType='next'
                blurOnSubmit={false}
            />
        </View>
        <View style={styles.inputContainer} >
            <Icons 
                name='ios-lock'
                size={28}
                color = {colors.primary}
                style = {styles.inputIcon}
            />
            <TextInput
                style={styles.input}
                onChangeText ={text => this.onChangeText('password',text)}
                value={password}
                placeholder="Mot de passe"
                secureTextEntry={showPass}
                placeholderTextColor='black'
                underlineColorAndroid='transparent'
                autoCapitalize='none'
                returnKeyType='send'
                blurOnSubmit={false}
                ref={input => this.secondTextInput = input}
                onSubmitEditing={this.login}
            />
            <TouchableOpacity style={styles.btnEye} onPress={this.showPassword}>
                <Icons 
                    name={showPass?'ios-eye':'ios-eye-off'}
                    size={28}
                    color={colors.primary}
                />
            </TouchableOpacity>
        </View>
        {
            messageErreur != "" && (
                    <View style={{alignItems:'center'}}>
                        <Text style={{color:'red'}}>{messageErreur}</Text>
                    </View>
                    )
                }
        <TouchableOpacity style={styles.btnLogin} onPress={this.login}>
            {this.renderButtonLogin()}
        </TouchableOpacity>
        <View>
            <Text style={{color:'black',fontWeight:'bold'}}>OU</Text>
        </View>
        <TouchableOpacity style={styles.btnGle} onPress={this.login}>
            <Text style={styles.btnText}>Compte google</Text>
        </TouchableOpacity>
        <View style={styles.btnSignup}>
            <Text>Pas de compte?</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')} >
                <Text style={{color:colors.primary,fontWeight:'bold',paddingLeft:5}}>S'inscrire</Text>
            </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        backgroundColor: '#fff',
    },
    title: {
        color:'black',
        fontWeight:'bold',
        fontSize:26,
    },
    inputContainer: {
        marginTop:10,
        justifyContent: 'center',
    },
    input: {
        width:width-40,
        height:45,
        borderRadius:25,
        fontSize:16,
        paddingLeft:45,
        color:'black',
        marginHorizontal:25,
        borderWidth: 1,
        borderColor: colors.primary,
        marginBottom: 10,
    },
    inputIcon: {
        position: 'absolute',
        top:8,
        left:40
    },
    btnEye: {
        position: 'absolute',
        top:8,
        right:37
    },
    btnLogin: {
        width:width - 100,
        height:45,
        borderRadius:25,
        marginVertical:10,
        backgroundColor:colors.primary,
        justifyContent: 'center',
    },
    btnGle: {
        width:width - 100,
        height:45,
        borderRadius:25,
        marginTop:10,
        backgroundColor:colors.secondary,
        justifyContent: 'center',
    },
    btnText: {
        color:'#fff',
        fontSize:16,
        fontWeight:'bold',
        textAlign:'center'
    },
    btnSignup:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        margin: 10,
    }
})

export default connect()(Login);