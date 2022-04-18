import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Typography from '@mui/material/Typography';
import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import DatePicker from '../../components/datePicker';

const strapiHost = process.env.NEXT_PUBLIC_STRAPI_HOST;
const strapiPort = process.env.NEXT_PUBLIC_STRAPI_PORT;

const natures = [
    'AF',
    'AFF',
    'C DO',
    'C.GRILL',
    'CGR',
    'CRF',
    'CRV',
    'RBR',
    'RGR',
    'RRF',
    'RRV',
    'RTE',
    'SBR',
    'SCO',
    'SSC',
    'SSRBR',
];
const etats = ['En instant', 'En cours', 'Traitée', 'Achevée', 'Programée'];

const getIntervDetails = (intervId) =>
    axios.get(`http://${strapiHost}:${strapiPort}/api/interventions/${intervId}`).then(({ data }) => data);

const intervDetails = ({ intervDetails }) => {
    const router = useRouter();
    const { intervId } = router.query;

    const {
        data: { data },
    } = useQuery(['intervDetails', intervId], () => getIntervDetails(intervId), {
        initialData: intervDetails,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const initialFValues = {
        id: data.id,
        Reference: data.attributes.Reference,
        Addresse: data.attributes.Addresse,
        Date_Note: data.attributes.Date_Note,
        Nature: data.attributes.Nature,
        Note: data.attributes.Note,
        Ordre: data.attributes.Ordre,
        Ligne_de_conduite: data.attributes.Ligne_de_conduite,
        Date_de_reception: data.attributes.Date_de_reception,
        Debut_des_travaux: data.attributes.Debut_des_travaux,
        Fin_des_travaux: data.attributes.Fin_des_travaux,
        Etat: data.attributes.Etat,
    };

    const [inputFields, setInputFields] = useState(initialFValues);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setInputFields({ ...inputFields, [name]: value });
    };

    return (
        <>
            <Typography variant="h4" sx={{ color: 'primary.main', mb: 2 }}>
                Details d'intervention
            </Typography>
            <Paper
                sx={{
                    p: 3,
                    display: 'flex',
                    gap: 2,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                }}
            >
                <form>
                    {
                        <Grid container spacing={1} sx={{ mb: { xs: 4, md: 2 } }}>
                            <Grid item xs={12} md={2}>
                                <TextField
                                    label="Reference"
                                    name="Reference"
                                    value={inputFields.Reference}
                                    variant="outlined"
                                    onChange={handleChangeInput}
                                    fullWidth
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Addresse"
                                    name="Addresse"
                                    value={inputFields.Addresse}
                                    variant="outlined"
                                    onChange={handleChangeInput}
                                    fullWidth
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <DatePicker
                                    id={inputFields.id}
                                    value={inputFields.Date_de_reception}
                                    name="Date_de_reception"
                                    label="Date de reception"
                                    changeEvent={handleChangeInput}
                                    isDisabled={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <TextField
                                    label="Note"
                                    name="Note"
                                    type="number"
                                    value={inputFields.Note}
                                    variant="outlined"
                                    onChange={handleChangeInput}
                                    fullWidth
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <DatePicker
                                    id={inputFields.id}
                                    value={inputFields.Date_Note}
                                    name="Date_Note"
                                    label="Date note"
                                    changeEvent={handleChangeInput}
                                    isDisabled={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <FormControl sx={{ width: 2 / 2 }}>
                                    <InputLabel>Nature</InputLabel>
                                    <Select
                                        value={inputFields.Nature}
                                        name="Nature"
                                        onChange={handleChangeInput}
                                        label="Nature"
                                        fullWidth
                                        disabled
                                    >
                                        {natures.map((nature, i) => (
                                            <MenuItem key={i} value={nature}>
                                                {nature}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <FormControl sx={{ width: 2 / 2 }}>
                                    <InputLabel>Etat</InputLabel>
                                    <Select
                                        value={inputFields.Etat}
                                        name="Etat"
                                        onChange={handleChangeInput}
                                        label="Etat"
                                        fullWidth
                                        disabled
                                    >
                                        {etats.map((etat, i) => (
                                            <MenuItem key={i} value={etat}>
                                                {etat}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <TextField
                                    label="Ordre"
                                    name="Ordre"
                                    type="number"
                                    value={inputFields.Ordre}
                                    variant="outlined"
                                    onChange={handleChangeInput}
                                    fullWidth
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <TextField
                                    label="Ligne de conduite"
                                    name="Ligne_de_conduite"
                                    value={inputFields.Ligne_de_conduite}
                                    variant="outlined"
                                    onChange={handleChangeInput}
                                    fullWidth
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <DatePicker
                                    id={inputFields.id}
                                    value={inputFields.Debut_des_travaux}
                                    name="Debut_des_travaux"
                                    label="Debut des travaux"
                                    changeEvent={handleChangeInput}
                                    isDisabled={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <DatePicker
                                    id={inputFields.id}
                                    value={inputFields.Fin_des_travaux}
                                    name="Fin_des_travaux"
                                    label="Fin des travaux"
                                    changeEvent={handleChangeInput}
                                    isDisabled={true}
                                />
                            </Grid>
                        </Grid>
                    }
                </form>
            </Paper>
        </>
    );
};

export async function getServerSideProps({ params: { intervId } }) {
    return {
        props: {
            intervDetails: await getIntervDetails(intervId),
        },
    };
}

export default intervDetails;
