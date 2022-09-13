import * as React from 'react';
import { Text, View, StatusBar, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Quiz extends React.Component {
    constructor() {
        super()
        this.state = {
            arr: [
                {
                    question: '1- (5 + 4)',
                    a: '7',
                    b: '9',
                    c: '11',
                    d: '8',
                    answer: '',
                    true_answer: '9'
                },
                {
                    question: '2- (7 + 8)',
                    a: '10',
                    b: '17',
                    c: '15',
                    d: '12',
                    answer: '',
                    true_answer: '15'
                },
                {
                    question: '3- (20 - 9)',
                    a: '11',
                    b: '14',
                    c: '16',
                    d: '10',
                    answer: '',
                    true_answer: '11'
                },
                {
                    question: '4- (65 - 15)',
                    a: '40',
                    b: '35',
                    c: '50',
                    d: '47',
                    answer: '',
                    true_answer: '50'
                },
                {
                    question: '5- (5 * 7)',
                    a: '30',
                    b: '25',
                    c: '40',
                    d: '35',
                    answer: '',
                    true_answer: '35'
                },
            ],

            count: 0,
            visible_modal: false,
            grade: false,
            grade_count: 0,
            choise_A: false,
            choise_B: false,
            choise_C: false,
            choise_D: false,
            editting: false,
            start: false
        }
    }

    async componentDidMount() {
        let my_quize = JSON.parse(await AsyncStorage.getItem('new_quiz'))
        console.log(my_quize)
        this.setState({ arr: my_quize })
    }

    async add_answer() {
        let new_arr = this.state.arr
        let new_answer = ''

        if (this.state.choise_A == true) {
            new_answer = new_arr[this.state.count].a
        }
        else if (this.state.choise_B == true) {
            new_answer = new_arr[this.state.count].b
        }
        else if (this.state.choise_C == true) {
            new_answer = new_arr[this.state.count].c
        }
        else if (this.state.choise_D == true) {
            new_answer = new_arr[this.state.count].d
        }

        new_arr[this.state.count].answer = new_answer

        console.log('your answer is: ' + new_answer)

        this.setState({
            arr: new_arr
        })

        await AsyncStorage.setItem('new_quiz', JSON.stringify(new_arr))

    }

    async quiz_grade() {
        let new_arr = this.state.arr
        let your_grade = this.state.grade_count

        if (new_arr[this.state.count].true_answer == new_arr[this.state.count].answer) {
            your_grade += 1
        }

        console.log("grade: " + your_grade)
        console.log("count Fun: " + this.state.count)
        this.setState({ grade_count: your_grade })

        await AsyncStorage.setItem('new_quiz', JSON.stringify(new_arr))
    }

    async edit_fun() {
        let new_arr = this.state.arr

        if (new_arr[this.state.count].answer == new_arr[this.state.count].a) {
            this.setState({
                choise_A: true,
                choise_B: false,
                choise_C: false,
                choise_D: false
            })
        }
        else if (new_arr[this.state.count].answer == new_arr[this.state.count].b) {
            this.setState({
                choise_A: false,
                choise_B: true,
                choise_C: false,
                choise_D: false
            })
        }
        else if (new_arr[this.state.count].answer == new_arr[this.state.count].c) {
            this.setState({
                choise_A: false,
                choise_B: false,
                choise_C: true,
                choise_D: false
            })
        }
        else if (new_arr[this.state.count].answer == new_arr[this.state.count].d) {
            this.setState({
                choise_A: false,
                choise_B: false,
                choise_C: false,
                choise_D: true
            })
        }

        await AsyncStorage.setItem('new_quiz', JSON.stringify(new_arr))
    }

    async finish_quiz() {
        let new_arr = this.state.arr

        for (let i = 0; i < new_arr.length; i++) {
            new_arr[i].answer = ''
        }

        this.setState({
            arr: new_arr,
            visible_modal: false,
            count: 0,
            grade_count: 0,
            grade: false,
            choise_A: false,
            choise_B: false,
            choise_C: false,
            choise_D: false,
        })

        await AsyncStorage.setItem('new_quiz', JSON.stringify(new_arr))
    }

    render() {
        return (
            <>
                <StatusBar barStyle='ligth-content' backgroundColor={'#06caa1'} />

                {this.state.start == false ?

                    (
                        <View style={{ backgroundColor: "#06caa1", flex: 1, alignItems: 'center' }}>

                            <Image
                                source={require('./img/2.jpg')}
                                style={{ width: '100%', height: '30%', marginTop: '20%' }}
                            />

                            <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold', marginTop: '10%', fontStyle: 'italic' }}>
                                Welcome to our app
                            </Text>

                            <TouchableOpacity
                                style=
                                {{
                                    height: '7%',
                                    width: '80%',
                                    backgroundColor: '#fff',
                                    marginTop: '60%',
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onPress={() => {
                                    this.setState({ start: true })
                                }}
                            >
                                <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>Get start</Text>

                            </TouchableOpacity>

                        </View>)
                    :
                    (
                        <>
                            <View
                                style={{
                                    height: 80,
                                    backgroundColor: '#06caa1',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingHorizontal: 25,
                                }}
                            >
                                <Text
                                    style={{ fontSize: 22, fontWeight: 'bold', color: '#fff', marginLeft: '45%' }}
                                >
                                    Quiz
                                </Text>

                            </View>
                            <View
                                style={{
                                    backgroundColor: '#fff',
                                    flex: 1,
                                }}
                            >

                                <Text
                                    style={{
                                        color: '#000',
                                        fontSize: 25,
                                        fontWeight: 'bold',
                                        marginLeft: 5,
                                        marginTop: '5%',
                                        paddingHorizontal: 10
                                    }}
                                >
                                    Question {this.state.count + 1}
                                    <Text style={{ color: '#000', fontSize: 20 }}>/{this.state.arr.length}</Text>
                                </Text>

                                <View style={{ backgroundColor: '#000', width: '100%', height: 1, marginTop: 10 }}></View>

                                <Text
                                    style={{
                                        color: '#f00',
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        marginLeft: 5,
                                        marginTop: '5%',
                                        paddingHorizontal: 10
                                    }}
                                >
                                    {this.state.arr[this.state.count].question} = .......
                                </Text>

                                <TouchableOpacity
                                    style={{
                                        backgroundColor: this.state.choise_A == true ? '#0ff' : '#e0eae9',
                                        width: '90%',
                                        height: 50,
                                        marginTop: 30,
                                        alignSelf: 'center',
                                        borderRadius: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 10
                                    }}
                                    activeOpacity={.5}
                                    onPress={() => {
                                        this.setState({
                                            choise_A: !this.state.choise_A,
                                            choise_B: false,
                                            choise_C: false,
                                            choise_D: false,
                                        }, () => {
                                            this.add_answer();
                                        });
                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: this.state.choise_A == true ? '#000' : '#fff',
                                            width: 20,
                                            height: 20,
                                            borderRadius: 10
                                        }}
                                    >
                                    </View>

                                    <Text style={{ color: '#000', fontSize: 20, marginLeft: 20 }}>
                                        {this.state.arr[this.state.count].a}
                                    </Text>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        backgroundColor: this.state.choise_B == true ? '#0ff' : '#e0eae9',
                                        width: '90%',
                                        height: 50,
                                        marginTop: 20,
                                        alignSelf: 'center',
                                        borderRadius: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 10
                                    }}
                                    activeOpacity={.5}
                                    onPress={() => {
                                        this.setState({
                                            choise_B: !this.state.choise_B,
                                            choise_A: false,
                                            choise_C: false,
                                            choise_D: false,
                                        }, () => {
                                            this.add_answer();
                                        });

                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: this.state.choise_B == true ? '#000' : '#fff',
                                            width: 20,
                                            height: 20,
                                            borderRadius: 10
                                        }}
                                    >
                                    </View>

                                    <Text style={{ color: '#000', fontSize: 20, marginLeft: 20 }}>
                                        {this.state.arr[this.state.count].b}
                                    </Text>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        backgroundColor: this.state.choise_C == true ? '#0ff' : '#e0eae9',
                                        width: '90%',
                                        height: 50,
                                        marginTop: 20,
                                        alignSelf: 'center',
                                        borderRadius: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 10
                                    }}
                                    activeOpacity={.5}
                                    onPress={() => {
                                        this.setState({
                                            choise_C: !this.state.choise_C,
                                            choise_A: false,
                                            choise_B: false,
                                            choise_D: false,
                                        }, () => {
                                            this.add_answer();
                                        });

                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: this.state.choise_C == true ? '#000' : '#fff',
                                            width: 20,
                                            height: 20,
                                            borderRadius: 10
                                        }}
                                    >
                                    </View>

                                    <Text style={{ color: '#000', fontSize: 20, marginLeft: 20 }}>
                                        {this.state.arr[this.state.count].c}
                                    </Text>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        backgroundColor: this.state.choise_D == true ? '#0ff' : '#e0eae9',
                                        width: '90%',
                                        height: 50,
                                        marginTop: 20,
                                        alignSelf: 'center',
                                        borderRadius: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 10
                                    }}
                                    activeOpacity={.5}
                                    onPress={() => {
                                        this.setState({
                                            choise_D: !this.state.choise_D,
                                            choise_A: false,
                                            choise_B: false,
                                            choise_C: false,
                                        }, () => {
                                            this.add_answer();
                                        });

                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: this.state.choise_D == true ? '#000' : '#fff',
                                            width: 20,
                                            height: 20,
                                            borderRadius: 10
                                        }}
                                    >
                                    </View>

                                    <Text style={{ color: '#000', fontSize: 20, marginLeft: 20 }}>
                                        {this.state.arr[this.state.count].d}
                                    </Text>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#06caa1',
                                        width: '40%',
                                        height: 50,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                        borderRadius: 10,
                                        marginTop: "40%"
                                    }}
                                    onPress={() => {
                                        if (this.state.count < this.state.arr.length - 1) {
                                            this.setState({
                                                count: this.state.count + 1,
                                                choise_A: false,
                                                choise_B: false,
                                                choise_C: false,
                                                choise_D: false,
                                            }, () => {
                                                if (this.state.editting == true) {
                                                    this.edit_fun();
                                                }
                                            });

                                            this.quiz_grade();

                                            console.log("count: " + this.state.count);
                                            console.log(this.state.arr[this.state.count].answer);
                                            console.log(this.state.arr[this.state.count].true_answer);
                                        }
                                        else {
                                            this.quiz_grade();
                                            this.edit_fun();
                                            this.setState({ visible_modal: true, editting: false });

                                            console.log("count: " + this.state.count);
                                            console.log(this.state.arr[this.state.count].answer);
                                            console.log(this.state.arr[this.state.count].true_answer);
                                        }
                                    }}
                                >
                                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                                        {this.state.count < this.state.arr.length - 1 ? 'next' : 'finish'}
                                    </Text>

                                </TouchableOpacity>

                                {this.state.grade == false ?
                                    (
                                        <Modal
                                            visible={this.state.visible_modal}
                                            onRequestClose={() => {
                                                this.setState({
                                                    visible_modal: false,
                                                });
                                            }}
                                        >

                                            <View
                                                style={{
                                                    height: 80,
                                                    backgroundColor: '#06caa1',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    paddingHorizontal: 20,
                                                    justifyContent: 'space-between'
                                                }}
                                            >

                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.setState({
                                                            visible_modal: false, count: 0, grade_count: 0, editting: true
                                                        }, () => {
                                                            this.edit_fun();
                                                        });
                                                    }}
                                                >
                                                    <Text style={{ color: '#00f', fontSize: 18, fontWeight: 'bold', }}>
                                                        Edit
                                                    </Text>
                                                </TouchableOpacity>

                                                <Text
                                                    style={{ fontSize: 25, fontWeight: 'bold', color: '#fff', marginLeft: 30 }}
                                                >
                                                    quiz app
                                                </Text>

                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.setState({ grade: true });
                                                    }}
                                                >
                                                    <Text style={{ color: '#00f', fontSize: 18, fontWeight: 'bold', }}>
                                                        Submit
                                                    </Text>

                                                </TouchableOpacity>

                                            </View>

                                            <ScrollView>
                                                {this.state.arr.map((item, index) => {
                                                    return (

                                                        <View
                                                            style={{
                                                                width: '90%',
                                                                marginTop: 25,
                                                                alignSelf: 'center',
                                                                backgroundColor: '#e0eae9',
                                                                borderRadius: 10,
                                                                borderWidth: .5
                                                            }}
                                                            key={index}
                                                        >

                                                            <View
                                                                style={{
                                                                    borderBottomWidth: .5,
                                                                }}
                                                            >
                                                                <Text style={{ color: '#f00', fontSize: 20, fontWeight: 'bold', margin: 10 }}>
                                                                    {item.question}
                                                                </Text>
                                                            </View>

                                                            <Text style={{ color: '#000', fontSize: 20, marginVertical: 15, marginLeft: 10 }}>
                                                                Your answer: {item.answer}
                                                            </Text>



                                                        </View>

                                                    );
                                                })}
                                            </ScrollView>

                                        </Modal>
                                    )
                                    :
                                    (
                                        <Modal
                                            visible={this.state.visible_modal}
                                            onRequestClose={() => {
                                                this.finish_quiz();
                                            }}
                                        >
                                            <View
                                                style={{
                                                    height: 80,
                                                    backgroundColor: '#06caa1',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    paddingHorizontal: 20,
                                                    justifyContent: 'center'
                                                }}
                                            >

                                                <Text
                                                    style={{ fontSize: 25, fontWeight: 'bold', color: '#fff' }}
                                                >
                                                    Grade
                                                </Text>


                                            </View>

                                            <View
                                                style={{
                                                    flex: 1,
                                                    backgroundColor: '#fff',
                                                    alignItems: 'center'
                                                }}
                                            >

                                                <View
                                                    style={{
                                                        width: '90%',
                                                        height: 300,
                                                        backgroundColor: '#e0eae9',
                                                        marginTop: 30,
                                                        borderRadius: 15,
                                                         alignItems: 'center',
                                                        padding: 10
                                                    }}
                                                >
                                                    <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>
                                                        Your grade is
                                                    </Text>

                                                    <Text style={{ color: '#f00', fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>
                                                        ({this.state.grade_count} / {this.state.arr.length} )
                                                    </Text>

                                                    <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold', marginTop: 100 }}>
                                                        We wish you the best for
                                                    </Text>

                                                    <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>
                                                        the next exame
                                                    </Text>

                                                </View>
 
                                                <TouchableOpacity
                                                    style={{
                                                        backgroundColor: '#06caa1',
                                                        width: '45%',
                                                        height: 50,
                                                        borderRadius: 10,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        marginTop: 200
                                                    }}
                                                    onPress={() => {
                                                        this.finish_quiz();
                                                        this.setState({
                                                            visible_modal: false,
                                                        });
                                                        this.setState({ start: false })
                                                    }}
                                                >
                                                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                                                        Finish
                                                    </Text>
                                                </TouchableOpacity>

                                            </View>

                                        </Modal>
                                    )}


                            </View>
                        </>
                    )
                }

            </>
        )
    }
}
