import React, { useState, useEffect }from 'react'
import { Link, useHistory } from 'react-router-dom'

import { FiPower, FiTrash2 } from 'react-icons/fi'
import './styles.scss'
import logoImg from '../../assets/logo.svg'

import api from '../../services/api'

function Profile(){
    const [incidents, setIncidents] = useState([])

    const history = useHistory()

    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')

    useEffect(() => {
        api.get('profile', {
          headers:   {
              Authorization: ongId
          }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId])

    async function handleDeleteIncidente(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        }catch(err){
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function HandleLogout(){
        localStorage.clear('ongName')

        history.push('/')
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg}  alt="be-the-hero" />
                <span>Bem vinda, {ongName}!</span>
                <Link className="btn" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={HandleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map((incident) => (
                    <li key={incident.id}>
                        <strong>CASO</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR</strong>
                        <p>{Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncidente(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
                
            </ul>
        </div>
    )
}

export default Profile