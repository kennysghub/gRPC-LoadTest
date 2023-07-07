import {startServer} from '../server/grpcServer';
import prometheusServer from './prometheusServer';


startServer()
prometheusServer();
