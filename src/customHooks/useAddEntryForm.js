


const useAddEntryForm = (formApiRef,setShowModal) => {
    const handleSubmit = (formvalues)=> {
        const { values } = formvalues;

        console.log(values);
        setShowModal(false);
        
    }

    const handleReset = () => {
        formApiRef.current.reset()
    }

    return { handleSubmit,handleReset};
}

export default useAddEntryForm