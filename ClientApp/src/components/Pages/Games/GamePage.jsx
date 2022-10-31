import React, { useEffect } from 'react'
import { GameCards } from './GameCards';
import { observer } from "mobx-react-lite"
import { InputStore } from '../../../store/Game/inputStore'

export const GamePage = observer((props) => {

    const inputController = new InputStore();

    useEffect(() => {
        props.gameController.fetchGames()
    }, [])

    const OnClickAllGames = () => {
        props.gameController.fetchGames()
    }

    const OnClickMostRentedGame = () => {
        props.gameController.fetchMostRentedGame()
    }

    const OnClickFilter1 = (filter, data) => {
        if (filter === "Game producer") props.gameController.fetchGameWithProducer(data)
        if (filter === "Game director") props.gameController.fetchGameWithDirector(data)
        if (filter === "Game characters") props.gameController.fetchGameWithCharacter(data)
    }


    const OnClickReleaseDate = (date) => {
        props.gameController.fetchGameReleaseDate(date)

    }

    const OnCreate = (data) => {
        props.gameController.createGame(JSON.parse(JSON.stringify(data)))
    }

    const OnClickAgeRange = (startAge, endAge) => {
        props.gameController.fetchGamesAgeRange(startAge, endAge)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        e.target.reset()
    }


    return (
        <div>
            <h1 className='text-4xl font-bold text-center md:my-8 my-4'>Games</h1>
            <div className="flex flex-wrap flex-row gap-4 md:mx-[9rem] mx-4 ">
                <button className="btn btn-primary" onClick={() => OnClickAllGames()}>View all games</button>
                <button className="btn btn-primary" onClick={() => OnClickMostRentedGame()}>View most rented game</button>
                <input type="text" key={'text'} onChange={(e) => inputController.OnChange('text', e.target.value)} placeholder="Type here" className="text-black bg-white input input-bordered w-full md:max-w-[12rem]" />

                <div className="form-control">
                    <div className="input-group">
                        <select className="select select-bordered w-full max-w-[10rem] bg-white text-black" key={'select'} onChange={(e) => inputController.OnChange('select', e.target.value)}>
                            <option defaultValue={"Choose filter"}>Choose filter</option>
                            <option>Game director</option>
                            <option>Game characters</option>
                            <option>Game producer</option>
                        </select>
                        <button className="btn btn-primary" onClick={() => OnClickFilter1(inputController.data['select'], inputController.data['text'])}>Filter</button>
                    </div>
                </div>


                <div className="form-control">
                    <div className="input-group">
                        <input type={"date"} key={'date'} onChange={(e) => inputController.OnChange('date', e.target.value)} className="rounded-lg input input-bordered max-w-[10rem] bg-white text-black"></input>
                        <button className="btn btn-primary" onClick={() => OnClickReleaseDate(inputController.data['date'])}>Filter</button>
                    </div>
                </div>


                <div className="form-control">
                    <div className="input-group w-full">
                        <label className="input-group">
                            <input type="number" placeholder="Initial age" key={'initalAge'} onChange={(e) => inputController.OnChange('initialAge', e.target.value)} className="bg-white text-black input input-bordered max-w-[7rem] text-center" />
                            <span className='input border border-opacity-20'>to</span>
                            <input type="number" placeholder="End age" key={'endAge'} onChange={(e) => inputController.OnChange('endAge', e.target.value)} className="bg-white text-black !rounded-none input  max-w-[7rem] text-center" />
                        </label>
                        <button className='btn btn-primary' onClick={() => OnClickAgeRange(inputController.data['initialAge'], inputController.data['endAge'])}>Filter</button>
                    </div>
                </div>


                <label htmlFor="my-modal-6" className="btn btn-primary">Create a game</label>
                <input type="checkbox" id="my-modal-6" className="modal-toggle" />

                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <form onSubmit={handleOnSubmit}>
                            <h3 className="font-bold text-lg">Create a game</h3>
                            <input type="text" placeholder="Name" name='name' className="input input-bordered w-full max-w-xs" key={'name'} onChange={(e) => inputController.OnChangeModal('name', e.target.value)} />
                            <p>Release date</p>
                            <input type={"date"} name='releaseDate' className="rounded-lg input input-bordered" key='releaseDate' onChange={(e) => inputController.OnChangeModal('releaseDate', e.target.value)}></input>
                            <input type="text" name="director" placeholder="Director" className="input input-bordered w-full max-w-xs" key={'director'} onChange={(e) => inputController.OnChangeModal('director', e.target.value)} />
                            <input type="text" name='producer' placeholder="Producer" className="input input-bordered w-full max-w-xs" key='producer' onChange={(e) => inputController.OnChangeModal('producer', e.target.value)} />
                            <input type="text" name='company' placeholder="Company" className="input input-bordered w-full max-w-xs" key='company' onChange={(e) => inputController.OnChangeModal('company', e.target.value)} />
                            <input type="number" name='price' placeholder="Price" className="input input-bordered w-full max-w-xs" key='price' onChange={(e) => inputController.OnChangeModal('price', e.target.value)} />
                            <div className="modal-action">
                                <label htmlFor="my-modal-6" className="btn btn-error">Cancel</label>
                                <button htmlFor="my-modal-6" type='submit' className="btn btn-primary" onClick={() => OnCreate(inputController.dataModal)}>Create</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
            <GameCards gameController={props.gameController} />
        </div>
    )
})
