import './ResponseCard.css'
import StatusButton from '../forms/StatusButton'
import IntractButton from './IntractButton'
import DataColumn from './DataColumn'
const ResponseCard = () => {
    return (
        <div className="d-flex justify-content-center py-2" style={{ color: "white", width: "100%" }}>
            <div className="d-flex justify-content-between w-75 border rounded-2 p-2">
                <div className="col-sm-1">
                    <StatusButton color="#FDE9E9" cardwidth="7%" />
                </div>

                <DataColumn data="someone@example.com" />
                <DataColumn data="507f191e810c19729de860ea" />
                <DataColumn data="21-03-2022" />
                
                <div className="col d-flex gap-5 justify-content-center align-items-end">
                    <IntractButton iconClass="bi bi-pencil-fill" bgColor="white" textColor="text-dark" to="/edit" />
                    <IntractButton iconClass="bi bi-eye-fill" bgColor="white" textColor="text-dark" to="/view" />
                    <IntractButton iconClass="bi bi-trash3-fill" bgColor="white" textColor="text-danger" to="/delete" />
                </div>
            </div>
        </div>

    )
}

export default ResponseCard