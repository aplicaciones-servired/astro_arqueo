import type { Sequelize } from 'sequelize';
import { getPoolArqueo } from './dbArqueo';
import { getPoolTBUsuario } from './dbtbusert';
import { getPoolUsuario } from './dbUsuario';
import { getPoolGamble } from './dbGamble';
import { getPoolLogin } from './dbLogin';

const POOLS: Array<{ label: string; sequelize: Sequelize }> = [
  { label: 'arqueo/servired', sequelize: getPoolArqueo },
  { label: 'btpersona', sequelize: getPoolTBUsuario },
  { label: 'usuario', sequelize: getPoolUsuario },
  { label: 'info/powerbi', sequelize: getPoolGamble },
  { label: 'login/gane', sequelize: getPoolLogin },
];

export async function checkDatabaseConnections(): Promise<void> {
  await Promise.all(
    POOLS.map(async ({ label, sequelize }) => {
      const { host, port, database } = sequelize.config;
      const target = `${host}:${port ?? 3306}/${database}`;
      try {
        await sequelize.authenticate();
        console.log(`MySQL OK -> ${target} (${label})`);
      } catch (error) {
        const reason = error instanceof Error ? error.message : String(error);
        console.error(`MySQL SIN CONEXION -> ${target} (${label}): ${reason}`);
      }
    })
  );
}