import { createSlice } from '@reduxjs/toolkit';
export const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        isSaving: false,
        messageSaved: '',
        menus: [],
        active: null,
        // active: {
        //     id:'ABC123',
        //     title:'',
        //     body:'',
        //     date: 1232434,
        //     imageURLs:[], // https://foto1.jpg https://foto2.jpg 
        // }
    },
    reducers: {
        savingNewMenu: (state)=>{
            state.isSaving=true;
        },
        savingNewMenuEnd: (state)=>{
            state.isSaving=false;
        },
        addNewEmptyMenu: (state,  action ) => {
            state.menus.push(action.payload);
            state.isSaving = false;
        },
        setActiveMenu: (state,  action ) => {
            state.active = action.payload;
            state.messageSaved = ''
        },
        setMenus: (state,  action ) => {
            state.menus = action.payload;
        },
        setSaving: (state ) => {
           
        },
        updateMenu: (state,  action ) => {
           
        },

        deleteMenuById: (state,  action ) => {
            
        },
    }
});

// Action creators are generated for each case reducer function
export const { addNewEmptyMenu,setActiveMenu ,setMenus, setSaving, updateMenu, deleteMenuById, savingNewMenu, savingNewMenuEnd} = menuSlice.actions;