import React from 'react';
import {StyleSheet, View, Text, Button, TextInput} from 'react-native';
import {globalStyles} from '../global/globalstyle';
import {Formik} from 'formik';
import * as yup from 'yup';

export default function AddForm({addTask}){

    return (
        <View>
            <Formik initialValues={{title: '', description: ''}}
                    validationSchema = {validSchema}
                    onSubmit={(values, actions) => {
                        actions.resetForm();
                        addTask(values);
                    }}>
                {(formikProps) => (
                    <View>
                        <TextInput style={globalStyles.input} 
                                    placeholder="Task title"
                                    onChangeText={formikProps.handleChange('title')}
                                    onBlur={formikProps.handleBlur('title')}
                                    value={formikProps.values.title}/>
                        <Text style={styles.alert}>{formikProps.touched.title && formikProps.errors.title}</Text>          
                        <TextInput multiline
                                    style={globalStyles.input} 
                                    placeholder="Task description"
                                    onChangeText={formikProps.handleChange('description')}
                                    onBlur={formikProps.handleBlur('description')}
                                    value={formikProps.values.description}/>
                        <Text style={styles.alert}>{formikProps.touched.description && formikProps.errors.description}</Text>          
                        <Button title="Submit" color='#8420CE' onPress={formikProps.handleSubmit}></Button>
                    </View>
                )}
            </Formik>
        </View>
    );
}

const validSchema = yup.object({
    title: yup.string().required().min(4),
    description: yup.string().required().min(4)
});

const styles = StyleSheet.create({
    alert: {
        color: "#f00",
        paddingVertical: 5,
        paddingHorizontal: 10
    }
});