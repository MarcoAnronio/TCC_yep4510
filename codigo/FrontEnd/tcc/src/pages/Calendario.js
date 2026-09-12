import Layout from '../components/layout.js';
import '../style/Calendario.css';
import '../style/Global.css';

function Calendario() {
    return (
        <Layout>
            <h1>Calendário</h1>
            <div className="calendar-container">
                <p>
                    Abaixo constam as datas de treinamentos, provas e outras datas relevantes
                    no processo de intercâmbio do Rotary no Distrito 4510.
                </p>

                <h2>Março</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Dom</th><th>Seg</th><th>Ter</th><th>Qua</th>
                            <th>Qui</th><th>Sex</th><th>Sáb</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>17</td><td>18</td><td>19</td><td>20</td>
                            <td>21</td><td>22</td>
                            <td className="evento">
                                23<br />
                                Treinamento de Outbounds<br />
                                Local: FEMA - Assis-SP
                            </td>
                        </tr>
                    </tbody>
                </table>

                <h2>Junho</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Dom</th><th>Seg</th><th>Ter</th><th>Qua</th>
                            <th>Qui</th><th>Sex</th><th>Sáb</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>23</td><td>24</td><td>25</td><td>26</td>
                            <td>27</td><td>28</td>
                            <td className="evento">
                                29<br />
                                Treinamento de Outbounds<br />
                                Local: FEMA - Assis-SP
                            </td>
                        </tr>
                    </tbody>
                </table>

                <h2>Setembro</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Dom</th><th>Seg</th><th>Ter</th><th>Qua</th>
                            <th>Qui</th><th>Sex</th><th>Sáb</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td><td>2</td><td>3</td><td>4</td>
                            <td>5</td><td>6</td>
                            <td className="evento">
                                7<br />
                                Data limite envio inscrições<br />
                                Local: FEMA - Assis-SP
                            </td>
                        </tr>
                        <tr>
                            <td>8</td><td>9</td><td>10</td><td>11</td>
                            <td>12</td><td>13</td>
                            <td className="evento">
                                14<br />
                                1º Treinamento de Orientação a Outbounds<br />
                                Local: FEMA - Assis-SP
                            </td>
                        </tr>
                        <tr>
                            <td>22</td><td>23</td><td>24</td><td>25</td>
                            <td>26</td><td>27</td>
                            <td className="evento">
                                28<br />
                                Escolha de Vagas<br />
                                Local: FEMA - Assis-SP
                            </td>
                        </tr>
                    </tbody>
                </table>

                <h2>Novembro</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Dom</th><th>Seg</th><th>Ter</th><th>Qua</th>
                            <th>Qui</th><th>Sex</th><th>Sáb</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>24</td><td>25</td><td>26</td><td>27</td>
                            <td>28</td><td>29</td>
                            <td className="evento">
                                30<br />
                                Treinamento de Outbounds<br />
                                Local: FEMA - Assis-SP
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default Calendario;
