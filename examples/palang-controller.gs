// Template controller untuk palang pintu Trainz 2009.
// Catatan: kode ini berupa kerangka logika, bukan API final yang dijamin valid
// untuk semua build TrainzScript. Sesuaikan dengan dokumentasi exporter dan API
// asset yang Anda gunakan.

class CrossingGateController isclass World
{
    string state = "OPEN";
    bool train_detected = false;
    bool warning_lights_on = false;
    bool alarm_on = false;

    float warning_delay = 5.0;
    float post_clear_delay = 8.0;

    Asset gate_left;
    Asset gate_right;
    Asset light_left;
    Asset light_right;
    Asset alarm;

    thread void init(void)
    {
        gate_left = GetAsset("gate_left");
        gate_right = GetAsset("gate_right");
        light_left = GetAsset("light_left");
        light_right = GetAsset("light_right");
        alarm = GetAsset("alarm");

        OpenGate();
        StopWarningLights();
        StopAlarm();

        while (true)
        {
            ProcessSensors();
            Wait(0.25);
        }
    }

    void ProcessSensors(void)
    {
        bool approach = IsApproachSensorTriggered();
        bool center = IsCenterSensorTriggered();
        bool clear = IsExitSensorTriggered();

        if (approach and state == "OPEN")
        {
            CloseGateSequence();
        }

        if (center)
        {
            train_detected = true;
        }

        if (clear and state == "CLOSED")
        {
            OpenGateSequence();
        }
    }

    void CloseGateSequence(void)
    {
        if (state == "CLOSING" || state == "CLOSED")
            return;

        state = "CLOSING";
        StartWarningLights();
        StartAlarm();

        PlayAnimation(gate_left, "close");
        PlayAnimation(gate_right, "close");

        WaitSeconds(warning_delay);

        state = "CLOSED";
    }

    void OpenGateSequence(void)
    {
        if (state == "OPENING" || state == "OPEN")
            return;

        state = "OPENING";

        WaitSeconds(post_clear_delay);

        StopAlarm();
        StopWarningLights();

        PlayAnimation(gate_left, "open");
        PlayAnimation(gate_right, "open");

        state = "OPEN";
    }

    void StartWarningLights(void)
    {
        if (light_left != null)
        {
            light_left.PlayAnimation("blink");
        }

        if (light_right != null)
        {
            light_right.PlayAnimation("blink");
        }

        warning_lights_on = true;
    }

    void StopWarningLights(void)
    {
        if (light_left != null)
        {
            light_left.PlayAnimation("idle");
        }

        if (light_right != null)
        {
            light_right.PlayAnimation("idle");
        }

        warning_lights_on = false;
    }

    void StartAlarm(void)
    {
        if (alarm != null)
        {
            alarm.PlaySound("crossing_alarm.wav");
        }

        alarm_on = true;
    }

    void StopAlarm(void)
    {
        if (alarm != null)
        {
            alarm.StopSound();
        }

        alarm_on = false;
    }

    void OpenGate(void)
    {
        if (gate_left != null)
        {
            gate_left.PlayAnimation("open");
        }

        if (gate_right != null)
        {
            gate_right.PlayAnimation("open");
        }
    }

    void CloseGate(void)
    {
        if (gate_left != null)
        {
            gate_left.PlayAnimation("close");
        }

        if (gate_right != null)
        {
            gate_right.PlayAnimation("close");
        }
    }

    // Fungsi ini hanya contoh. Ganti dengan metode API TrainzScript yang tepat.
    bool IsApproachSensorTriggered(void)
    {
        return false;
    }

    bool IsCenterSensorTriggered(void)
    {
        return false;
    }

    bool IsExitSensorTriggered(void)
    {
        return false;
    }

    void PlayAnimation(Asset obj, string anim_name)
    {
        if (obj != null)
        {
            obj.PlayAnimation(anim_name);
        }
    }
}
