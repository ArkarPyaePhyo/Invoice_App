import { create } from "zustand";

const UseRecordStore = create((set)=>({
    records:[],
    addRecord :(record)=>set((state)=>({records:[...state.records,record]})),
    deleteRecord:(id)=>set((state)=>({
        records: state.records.filter((record) => record.id !== id),
    })),
    changeQuantity:(id,quantity)=>set((state)=>({
        records: state.records.map(record => {
            if(record.product.id === id){
                const newQuantity = parseInt(record.quantity)+ parseInt(quantity);
                const newCost = record.product.price * newQuantity ;
                return {...record,quantity:newQuantity,cost:newCost}
            }
                return record;
            
        })
    })),
    resetRecord: ()=> set({records : []})
}))

export default UseRecordStore