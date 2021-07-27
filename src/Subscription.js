import { useState, useEffect } from "react"
import axios from 'axios'
import "./index.css"
function Subscription(props){
    var colors = ["red", "green", "yellow", "blue", "indigo", "purple", "pink"]
    const [selectedTenure, setSelectedTenure] = useState(30)
    const [subs, setSubs] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [Name, setName] = useState(null)
    const [Price, setPrice] = useState(null)
    const [Tenure, setTenure] = useState(null)
    const [sDate, setsDate] = useState(null)
    const [subID, setSubID] = useState(null)

    useEffect(() => getSubs() ,[])
    useEffect(() => {}, [subs])

    

    async function getSubs(){
        let resp;
        await axios.get("https://subscription-back.herokuapp.com/api/subs/" + props.username['username']).then((data) => {
            resp = data['data']
        })
        console.log(resp, props.username)
        setSubs(resp)
        return
    }

    async function deleteSub(e, id){
        console.log("https://subscription-back.herokuapp.com/api/subs/" + id)
        await axios.delete("https://subscription-back.herokuapp.com/api/subs/" + id).then((resp) => console.log(resp)).catch(e => console.log(e))
        await getSubs()
    }
    
    var total = 0;
    for(var i = 0; i < subs.length; i++){
        total += subs[i]['Price']/subs[i]['Tenure'] * selectedTenure
    }

    function changeTenure(e){
        var target = e.target.value
        var tenure = target == "Monthly" ? 30: target == "Annually" ? 365 : 7
        setSelectedTenure(tenure)
    }

    async function addSubscription(e){
        e.preventDefault()
        const Name = e.target.form[0].value
        const Price = e.target.form[1].value
        const Tenure = e.target.form[2].value
        const pDate = e.target.form[3].value
        console.log({
            Name: Name,
            Price: Price,
            Tenure: Tenure,
            Date: pDate,
            username: props.username['username']
        })
        await axios.post("https://subscription-back.herokuapp.com/api/subs/", {
            Name: Name,
            Price: Price,
            Tenure: Tenure,
            Date: pDate,
            username: props.username['username']
        }).then(res => {
            console.log(res)
            getSubs()
            setShowModal(false)
        })
        .catch(e => console.log(e))
    }

    async function updateSubscription(e){
        e.preventDefault()
        const Name = e.target.form[0].value
        const Price = e.target.form[1].value
        const Tenure = e.target.form[2].value
        const pDate = e.target.form[3].value
        console.log({
            Name: Name,
            Price: Price,
            Tenure: Tenure,
            Date: pDate,
            username: props.username['username']
        })
        await axios.put("https://subscription-back.herokuapp.com/api/subs/" + subID.toString(), {
            Name: Name,
            Price: Price,
            Tenure: Tenure,
            Date: pDate,
            username: props.username['username']
        }).then(res => {
            console.log(res)
            getSubs()
            setName(null)
            setPrice(null)
            setTenure(null)
            setsDate(null)
            setSubID(null)
            setShowModal(false)
        })
        .catch(e => console.log(e))
    }

    function subData(name, price, tenure, sdate, subID){
        setName(name)
        setPrice(price)
        setTenure(tenure)
        setsDate(sdate.slice(0,10))
        setSubID(subID)
        setShowModal(true)
    }

    return (
        <div className="flex flex-col bg-gray-900 pb-10 min-h-screen">
            <div className="w-full">
                <button className="flex flex-row m-auto mr-10 rounded-lg mt-5 mb-0 transition duration-500 cursor-pointer rounded-lg ease-in-out text-white bg-blue-500 hover:bg-blue-700 hover:text-white focus:outline-none transform hover:scale-100 p-4" onClick={() => setShowModal(true)}>Add Subscriptions</button>
                {showModal ? (
                    <>
                    <div
                        className=" SubsModal justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Add Subscription
                            </h3>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                            <form>
                                <div className="flex flex-row">
                                    <div className = "flex flex-col">
                                        <label className = "m-2 ml-0 text-lg">Name</label>
                                        <label className = "m-2 ml-0 text-lg mt-7">Price</label>
                                        <label className = "m-2 ml-0 text-lg mt-7">Tenure</label>
                                        <label className = "m-2 ml-0 text-lg mt-7">Date</label>
                                    </div>
                                    <div className="flex flex-col">
                                        <input className="p-2 border-grey-200 border-2 rounded-md focus:outline-none w-96" type="text" defaultValue={Name}></input>
                                        <input className="p-2 border-grey-200 border-2 rounded-md focus:outline-none mt-5 w-96" type="number" defaultValue={Price}></input>
                                        <input className="p-2 border-grey-200 border-2 rounded-md focus:outline-none mt-5 w-96" type="number" defaultValue={Tenure}></input>
                                        <input className="p-2 border-grey-200 border-2 rounded-md focus:outline-none mt-5 w-96" type="date" defaultValue={sDate}></input>
                                    </div>
                                </div>
                                <input className="m-auto my-5  p-3 transition duration-500 cursor-pointer rounded-lg w-32 ease-in-out text-white bg-red-400 hover:bg-red-700 hover:text-white focus:outline-none transform hover:scale-100" value="Close" type="submit" onClick={(e) => {
                                    e.preventDefault()
                                    setName(null)
                                    setPrice(null)
                                    setTenure(null)
                                    setsDate(null)
                                    setSubID(null)
                                    setShowModal(false)
                                }}></input>
                                <input className="m-auto my-5 ml-4 p-3 transition duration-500 cursor-pointer rounded-lg ease-in-out text-white bg-green-400 hover:bg-green-700 hover:text-white focus:outline-none transform hover:scale-100" value="Add Subscription" type="submit" onClick={Name == null ? addSubscription: updateSubscription}></input>
                            </form>
                            </div>
                            {/*footer*/}
                        </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
                <div className="flex flex-row m-10 rounded-lg mt-5 mb-0 bg-white p-10">
                    <div className="text-black text-2xl font-bold">Total Subcription Cost</div>
                    <select className="m-auto focus:outline-none w-48 border-2 rounded-md p-2 border-grey-200" onChange={changeTenure} name="tenure" id="tenure" defaultValue={"Monthly"}>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Annually">Annually</option>
                    </select>
                    <div className="text-black text-2xl m-auto mr-10 font-bold">{total.toFixed(2)}</div>
                </div>
            { subs.map((data, index) => {
                return (
                        <div className={"flex flex-row m-10 mt-5 mb-0 transition duration-250 cursor-pointer rounded-lg ease-in-out p-5 " + " bg-" + colors[index % colors.length].toString() + "-200"} >
                            <div className="text-black mt-2 w-32">{data['Name']}</div>
                            <button className="m-auto mr-5 w-20 rounded-lg transition duration-500 cursor-pointer rounded-lg ease-in-out text-white bg-blue-500 hover:bg-blue-700 hover:text-white focus:outline-none transform hover:scale-100 p-2" onClick={() => {subData(data['Name'], data['Price'], data['Tenure'], data['Date'], data['id'])}}>Edit</button>
                            <button className="m-auto mr-16 ml-10 rounded-lg transition duration-500 cursor-pointer rounded-lg ease-in-out text-white bg-red-500 hover:bg-red-700 hover:text-white focus:outline-none transform hsover:scale-100 p-2" onClick={(e) => deleteSub(e, data['id'])}>Delete</button>
                            <div className="text-black mr-16 w-12">{((data['Price']/data['Tenure'])*selectedTenure).toFixed(2).toString()}</div>
                        </div>
                )
            }) }
            </div>
        </div>
    )
}

export default Subscription