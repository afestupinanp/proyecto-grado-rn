import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import styles from '@styles/styles';
import { useTranslation } from 'react-i18next';
import { LanguageNamespaces } from '@lang/constants';
import { DataTable } from 'react-native-paper';
import { makeApiCall } from '@utils/utils';
import { ApplicationContext } from '@stores/AppContext';
import SimcaiRoutes from '@constants/SimcaiRoutes';

const Home = React.memo(() => {
    const [items, setItems] = useState<Record<string, any>[]>([]);
    const {t: tHome} = useTranslation(LanguageNamespaces.HOME);
    const appContext = useContext(ApplicationContext);
    const appData = appContext?.appData;

    const loadData = () => {
        if (!appData) {
            return;
        }
        makeApiCall(appData, SimcaiRoutes.LIST_ASSET_MOVEMENTS, 'GET', {}, {})
        .then(({response}) => {
            setItems(response?.data ?? []);
        }).catch(() => {

        });
    }

    useEffect(() => {
        loadData();
    }, []);

    return <>
        <View style={{...styles.container, flex: 1, alignContent: 'flex-start'}}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>#</DataTable.Title>
                    <DataTable.Title>Usuario/Ubicación</DataTable.Title>
                    <DataTable.Title>Cantidad de activos</DataTable.Title>
                    <DataTable.Title>Fecha de movimiento</DataTable.Title>
                </DataTable.Header>
                {items.map((item, idx) => (
                    <DataTable.Row key={idx}>
                        <DataTable.Cell>{idx + 1}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.user_data}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.asset_count}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.created_at}</DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
        </View>
    </>;
});

export default Home;