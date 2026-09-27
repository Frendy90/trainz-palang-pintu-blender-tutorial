// Kerangka logika, bukan implementasi API final.
// Cocokkan nama class, fungsi trigger, dan fungsi animasi dengan
// dokumentasi TrainzScript yang tersedia untuk Trainz Simulator 2009.

class CrossingController
{
    string state = "OPEN";
    bool trainPresent = false;

    void OnApproachSensor()
    {
        if (state == "OPEN")
        {
            StartWarningLights();
            StartAlarm();
            WaitSeconds(5);
            PlayAnimation("close");
            state = "CLOSED";
        }
    }

    void OnCenterSensor()
    {
        trainPresent = true;
    }

    void OnAllSensorsClear()
    {
        trainPresent = false;
        WaitSeconds(8);

        // Cek ulang untuk mencegah palang membuka ketika kereta berikutnya datang.
        if (!trainPresent)
        {
            StopAlarm();
            StopWarningLights();
            PlayAnimation("open");
            state = "OPEN";
        }
    }
}
