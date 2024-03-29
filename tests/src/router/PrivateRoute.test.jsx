import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { PrivateRoute } from "../../../src/router/PrivateRoute";

describe('Pruebas en <PrivateRoute />', () => {

    test('debe de mostrar el chldren si está auntenticado', () => {
        
        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                id: '123',
                name: 'Sidow'
            }
        };

        render(
            <AuthContext.Provider value = {contextValue}>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText('Ruta privada')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/search?q=batman');
    })
});