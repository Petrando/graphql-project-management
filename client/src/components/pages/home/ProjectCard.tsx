import { FC } from "react"
import { Project } from "../../../types"

const ProjectCard:FC<Project> = ({ id, name, status }) => {
    return (
        <div className='col-md-6'>
            <div className='card mb-3'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h5 className='card-title'>{name}</h5>
            
                        <a className='btn btn-light' href={`/projects/${id}`}>
                            View
                        </a>
                    </div>
                    <p className='small'>
                        Status: <strong>{status}</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard
  